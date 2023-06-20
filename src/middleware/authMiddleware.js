const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { find_one_user_by_criterial } = require('../repositories')
const { ALL_USER_ROLES, ADMIN_ROLE, SUPER_ROLE, SYSTEM_ROLE } = require('../config/users/roles/roles')

const protect = asyncHandler(async (req, res, next) => {
  let token

  let authorization = req.headers.authorization && req.headers.authorization.startsWith('Bearer')

  if (authorization) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await find_one_user_by_criterial({ _id: decoded._id })
      next()
    } catch (error) {
      res.status(401)
      throw new Error('No Autorizado, Token Requerido')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('No Autorizado para esta acción.')
  }
})

const forEditor = (req, res, next) => {
  if (req.user && ALL_USER_ROLES.includes(req.user.role)) {
    next()
  } else {
    res.status(401)
    throw new Error('No Autorizado como editor.')
  }
}

const forAdmin = (req, res, next) => {
  if (req.user && [ADMIN_ROLE, SUPER_ROLE].includes(req.user.role) && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('No Autorizado no eres Admin.')
  }
}

const forSuper = (req, res, next) => {
  if (req.user && req.user.isAdmin && req.user.isSuper && req.user.role === SUPER_ROLE) {
    next()
  } else {
    res.status(401)
    throw new Error('No Autorizado no eres Super Admin.')
  }
}

module.exports = { protect, forEditor, forAdmin, forSuper }
