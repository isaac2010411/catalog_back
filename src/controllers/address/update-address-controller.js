'use strict'

const asyncHandler = require('express-async-handler')
const Address = require('../../mongoose/models/addressModel')
const { new_address } = require('../../repositories')

// @desc    Update address
// @route   Put /api/addresses/:id
// @access  Public / Admin
const update_address = asyncHandler(async (req, res) => {
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
    coordinates,
  } = req.body

  const exist_address = await Address.findById(req.params.id)

  if (coordinates) {
    if (!Array.isArray(coordinates)) {
      await Address.updateOne(
        { _id: req.params.id },
        { $set: { coordinates: coordinates, isCoordinatesChecked: true } }
      )
      res.status(200).json({ ...exist_address._doc, coordinates: [coordinates] })
    } else {

      await Address.updateOne(
        { _id: req.params.id },
        {
          $set: {
            coordinates: [
              {
                type: 'Point',
                coordinates,
              },
            ],
            isCoordinatesChecked: true,
          },
        }
      )
      res.status(200).json({
        ...exist_address._doc,
        coordinates: [
          {
            type: 'Pointer',
            coordinates,
          },
        ],
      })
    }
  } else {
    const newInfo = {
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
    }
    await Address.updateOne({ _id: req.params.id }, { $set: { ...exist_address._doc, ...newInfo } })
    res.status(200).json({ ...exist_address._doc, ...newInfo })
  }
})

module.exports = update_address
