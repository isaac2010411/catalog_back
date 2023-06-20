'use strict'

const asyncHandler = require('express-async-handler')
const { new_user, find_one_user_by_criterial, new_log } = require('../../repositories')
const { USER_ROLE, ADMIN_ROLE, SUPER_ROLE } = require('../../config/users/roles/roles')

// @desc    Create user
// @route   POST /api/users
// @access  Public
const register_user = asyncHandler(async (req, res) => {
  const socket = req.app.get('io')
  const { name, email, isAdmin, isSuper, password } = req.body

  const isEmailExist = await find_one_user_by_criterial({ email })

  if (isEmailExist) {
    res.status(400)
    throw new Error('Ya existe una cuenta con este correo electrónico.')
  }

  try {
    const user = await new_user({
      role: isAdmin && isSuper ? SUPER_ROLE : isAdmin && !isSuper ? ADMIN_ROLE : USER_ROLE,
      name,
      password,
      email,
    })

    const log = await new_log({
      type: 'action',
      description: 'REGISTER_USER_SUCCESS',
      record: user._id,
    })

    await log.save()

    socket.in('admin').emit('dashboard', { users: 1 })

    res.status(201).json({
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      isDefaultPassword: user.isDefaultPassword,
      role: user.role,
      status: user.status,
      _id: user._id,
    })
  } catch (error) {
    const log = await new_log({
      type: 'error',
      description: 'REGISTER_USER_ERROR',
      errormessage: error.message,
    })

    await log.save()

    res.status(500)
    throw new Error('Error de servidor, intente mas tarde.')
  }
})

module.exports = register_user
