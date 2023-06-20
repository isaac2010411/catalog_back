'use strict'

const asyncHandler = require('express-async-handler')
const userRepository = require('../../repositories')
const { delete_user } = require('../../repositories/user-repository')

// @desc    DELETE user by admin
// @route   DELETE /api/users/:id
// @access  Private/Admin
const delete_users = asyncHandler(async (req, res) => {
  const user = await userRepository.find_one_user_by_criterial({ _id: req.params.id })

  if (user.length > 1) {
    res.status(404)
    throw new Error('No se encontraron usuarios en la base de datos.')
  }

  await delete_user(user)

  res.status(200).json(user)
})

module.exports = delete_users
