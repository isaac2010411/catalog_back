'use strict'

const asyncHandler = require('express-async-handler')
const { find_one_user_by_criterial } = require('../../repositories')
const { USER_ROLE, ADMIN_ROLE, SUPER_ROLE } = require('../../config/users/roles/roles')
const { update_user } = require('../../repositories/user-repository')
const generate_token = require('../../utils/generate-token')

// @desc    Update user profile from admin
// @route   PUT /api/users
// @access  Public
const update_user_by_admin = asyncHandler(async (req, res) => {
  const { name, lastName, email, isAdmin, isSuper, password, isActive, dni } = req.body

  const user = await find_one_user_by_criterial({ email })

  if (!user) {
    res.status(400)
    throw new Error('No existe el usuario que quiere editar.')
  }

  user.name = name ? name : user.name
  user.lastName = lastName ? lastName : user.lastName
  user.status = isActive === true ? 'active' : 'inactive'
  user.dni = dni ? dni : user.dni

  if (password) {
    user.password = password
    user.isDefaultPassword = false
  }
  if (isSuper && isAdmin) {
    user.role = SUPER_ROLE
  } else if (isAdmin) {
    user.role = ADMIN_ROLE
  } else {
    user.role = USER_ROLE
  }

  user.isAdmin = isAdmin == undefined ? user.isAdmin : isAdmin
  user.isSuper = isSuper == undefined ? user.isSuper : isSuper

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
    isDefaultPassword: user.isDefaultPassword,
    ...admin,
    ...superadmin,
  }

  res.status(200).json({
    token: generate_token(userInfo),
  })
})

module.exports = update_user_by_admin
