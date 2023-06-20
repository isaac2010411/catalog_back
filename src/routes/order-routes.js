'use strict'

const express = require('express')
const router = express.Router()

const {
  get_orders_by_user_id,
  get_all_orders_by_admin,
  get_orders_by_orderId_admin,
  update_order_state,
} = require('../controllers/orders')
const { protect, forAdmin } = require('../middleware/authMiddleware')

router.route('/users/:id').get(protect, get_orders_by_user_id)
router.route('/').get(protect, get_all_orders_by_admin)
router.route('/:orderId').get(protect, get_orders_by_orderId_admin)
router.route('/order-status/:id').put(protect, update_order_state)
module.exports = router
