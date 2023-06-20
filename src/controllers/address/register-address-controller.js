'use strict'

const asyncHandler = require('express-async-handler')
const axios = require('axios')
const QueryString = require('node:querystring')
const { new_address } = require('../../repositories')
const Address = require('../../mongoose/models/addressModel')

// @desc    Create address
// @route   POST /api/addresses
// @access  Public / Admin
const register_address = asyncHandler(async (req, res) => {
  const {
    name,
    cp,
    province,
    location,
    street,
    number,
    department,
    intersection1,
    intersection2,
    contactPhone,
    aditionalInfo,
    doorOrFloor,
  } = req.body
  const { _id } = req.user
  let log

  const encode = {
    street: `${number} ${street}`,
    country: 'Argentina',
    state: department,
    city: location,
    postalcode: cp,
    format: 'geojson',
  }

  let { data } = await axios.get(`https://nominatim.openstreetmap.org/search?${QueryString.encode(encode)}`)

  const coordinates = data.features.map((item) => item.geometry)
  const address = new Address({
    name,
    cp,
    province,
    location,
    street,
    number,
    department,
    intersection1,
    intersection2,
    contactPhone,
    aditionalInfo,
    doorOrFloor,
    coordinates,
    user: _id,
  })

  await address.save()

  if (!address) {
    await new_log({
      type: 'action',
      description: 'REGISTER_ADDRESS_ERROR',
      record: _id,
    })
    res.status(400)

    throw new Error('Error al registrar la dirección.')
  }
  res.status(200).json(address)
})

module.exports = register_address
