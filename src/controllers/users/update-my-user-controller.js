'use strict'

const asyncHandler = require('express-async-handler')
const { find_one_user_by_criterial } = require('../../repositories')
const { update_user } = require('../../repositories/user-repository')
const generate_token = require('../../utils/generate-token')

// @desc    Update profile from user
// @route   POST /api/users/:id
// @access  Public
const update_my_user = asyncHandler(async (req, res) => {
  const { name, lastName, phone, email, password, dni } = req.body

  const user = await find_one_user_by_criterial({ email })

  if (!user) {
    res.status(400)
    throw new Error('No existe el usuario que quiere editar.')
  }

  user.name = name ? name : user.name
  user.lastName = lastName ? lastName : user.lastName
  user.dni = dni ? dni : user.dni
  user.phone = phone ? phone : user.phone

  if (password) {
    user.password = password
    user.isDefaultPassword = false
  }

  await update_user(user)

  const admin = user.isAdmin
    ? {
        isAdmin: user.isAdmin,
      }
    : null

  const superadmin = user.isSuper
    ? {
        isSuper: user.isSuper,
      }
    : null

  const userInfo = {
    _id: user._id,
    name: user.name,
    lastName: user?.lastName || '',
    dni: dni ? dni : user.dni || '',
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    status: user.status,
    phone: user?.phone || '',
    isDefaultPassword: user.isDefaultPassword,
    ...admin,
    ...superadmin,
  }

  res.status(200).json({
    token: generate_token(userInfo),
  })
})

module.exports = update_my_user
