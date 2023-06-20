'use strict'

const asyncHandler = require('express-async-handler')
const Address = require('../../mongoose/models/addressModel')

// @desc    Get address by user Id
// @route   GET /api/addresses/users/userId
// @access  Public / Admin
const get_address_by_user_id = asyncHandler(async (req, res) => {
  const { userId } = req.params

  const address = await Address.find({ user: userId })

  res.status(200).json(address)
})

module.exports = get_address_by_user_id
