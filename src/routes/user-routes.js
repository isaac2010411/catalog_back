'use strict'

const express = require('express')
const router = express.Router()

const {
  register_user,
  auth_user,
  get_all_users,
  register_user_by_admin,
  delete_users,
  update_user_by_admin,
  update_my_user,
} = require('../controllers/users')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(register_user).get(protect, get_all_users)
router.route('/login').post(auth_user)
router.route('/by-admin').post(protect, register_user_by_admin).put(protect, update_user_by_admin)
router.route('/:id').put(protect, update_my_user).delete(protect, delete_users)

module.exports = router
