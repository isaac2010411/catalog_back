'use strict'

const asyncHandler = require('express-async-handler')
const User = require('../../mongoose/models/userModel')
const { SUPER_ROLE } = require('../../config/users/roles/roles')

// @desc    GET all users
// @route   GET /api/users
// @access  Private/Admin
const get_users = asyncHandler(async (req, res) => {
  const { role, _id } = req.user
  const isSuperAdmin = role === SUPER_ROLE
  let users


  if (isSuperAdmin) {
    users = await User.find().select('-password')
  } else {
    users = await User.find({ owner: _id }).select('-password')
  }

  if (users.length < 1) {
    res.status(404)
    throw new Error('No se encontraron usuarios en la base de datos.')
  }

  res.status(200).json(users)
})

module.exports = get_users
