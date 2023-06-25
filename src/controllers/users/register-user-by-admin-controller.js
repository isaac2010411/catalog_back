'use strict'

const asyncHandler = require('express-async-handler')
const { new_user, find_one_user_by_criterial, new_log } = require('../../repositories')
const { USER_ROLE, ADMIN_ROLE, SUPER_ROLE } = require('../../config/users/roles/roles')
const { generateRandomPassword } = require('../../utils/commonFunctions')
const { emailSender } = require('../../utils/emailSender')
const { templateUserRegistered } = require('../../utils/templates')

// @desc    Create user
// @route   POST /api/users/by-admin
// @access  Public
const register_user_by_admin = asyncHandler(async (req, res) => {
  const { name, lastName, email, dni, isAdmin, isSuper, isActive, phone, alias, accountValue } = req.body
  const { _id } = req.user

  const isEmailExist = await find_one_user_by_criterial({ email })
  const randomPassword = generateRandomPassword(8)

  if (isEmailExist) {
    res.status(400)
    throw new Error('Ya existe una cuenta con este correo electrónico.')
  }

  const emailSubject = 'Bienvenido a Hypnotic Grow Shop'
  const templateInfo = {
    email,
    password: randomPassword,
  }

  const responseEmailSender = await emailSender(templateInfo, templateUserRegistered, emailSubject)

  const isEmailSent = responseEmailSender.accepted?.length ? 'Correo electrónico enviado.' : responseEmailSender

  console.log(isEmailSent)

  let data = {
    role: isAdmin && isSuper ? SUPER_ROLE : isAdmin && !isSuper ? ADMIN_ROLE : USER_ROLE,
    name,
    lastName,
    password:randomPassword,
    dni,
    phone,
    email,
    status: isActive ? 'active' : 'inactive',
  }

  if (data.role === USER_ROLE) {
    data.owner = _id
  }

  if (isAdmin && !isSuper) {
    data.accountType = alias ? 'alias' : 'cbu'
    data.accountValue = accountValue
  }

  const user = await new_user(data)

  delete user.password

  if (user) {
    await new_log({
      type: 'action',
      description: 'REGISTER_USER_SUCCESS',
      record: user._id,
    })
    res.status(201).json(user)
  } else {
    await new_log({
      type: 'error',
      description: 'REGISTER_USER_ERROR',
      errormessage: error.message,
    })
    throw new Error('No se pudo registrar el usuario, intente mas tarde.')
  }
})

module.exports = register_user_by_admin
