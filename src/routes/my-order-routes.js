'use strict'

const express = require('express')
const router = express.Router()

const { get_my_orders, get_my_order } = require('../controllers/myOrders')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, get_my_orders)
router.route('/:id').get(protect, get_my_order)

module.exports = router
