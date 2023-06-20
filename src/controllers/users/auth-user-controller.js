'use strict'

const asyncHandler = require('express-async-handler')
const { new_log, find_one_user_by_criterial } = require('../../repositories')
const generate_token = require('../../utils/generate-token')

// @desc    Auth user && get token
// @route   POST /api/users/login
// @access  Public
const auth_user = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await find_one_user_by_criterial({ email })

  if (user && (await user.matchPassword(password))) {
    const admin = user.isAdmin
      ? {
          isAdmin: user.isAdmin,
          isSuper: user.isSuper,
        }
      : null
    if (user.status === 'inactive') {
      return res.status(403).json({ message: 'Su cuenta está inactiva' })
    }

    const log = await new_log({
      type: 'action',
      description: 'LOGIN_USER_SUCCESS',
      record: user._id,
    })

    await log.save()

    const userInfo = {
      _id: user._id,
      avatar: user.avatar,
      name: user?.name || null,
      lastName: user?.lastName || null,
      dni: user?.dni || null,
      email: user.email,
      address: user?.address || null,
      isDefaultPassword: user.isDefaultPassword,
      phone: user?.phone || null,
      role: user.role,
      gender: user.gender,
      createdAt: user.createdAt,
      ...admin,
    }

    res.status(200).json({
      token: generate_token(userInfo),
    })
  } else {
    const log = await new_log({
      type: 'error',
      description: 'LOGIN_USER_ERROR',
      record: email,
    })

    await log.save()

    res.status(401)
    throw new Error('Usuario o Contraseña Incorrectos')
  }
})

module.exports = auth_user
