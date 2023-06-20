'use strict'

const asyncHandler = require('express-async-handler')
const { destroy_address } = require('../../repositories')

// @desc    Delete address
// @route   DELETE /api/addresses/:id
// @access  Public / Admin
const delete_address = asyncHandler(async (req, res) => {
  const { id } = req.params

  await destroy_address(id)

  res.status(200).json({ _id: id })
})

module.exports = delete_address
