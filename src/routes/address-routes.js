'use strict'

const express = require('express')
const router = express.Router()

const {
  register_address,
  get_address_by_user_id,
  update_address,
  delete_address,
  update_address_coordinates,
} = require('../controllers/address')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, register_address)
router.route('/:id').put(protect, update_address).delete(protect, delete_address)
router.route('/:id/coordinates').put(protect, update_address_coordinates)
router.route('/users/:userId').get(protect, get_address_by_user_id)

module.exports = router
