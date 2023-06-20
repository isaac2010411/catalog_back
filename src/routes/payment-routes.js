'use strict'

const express = require('express')
const { generate_order } = require('../controllers/orders')
const { generate_payment_link, payment_confirmation } = require('../controllers/payments')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, generate_order)
router.route('/link').post(protect, generate_payment_link)
router.route('/:id').post(payment_confirmation)

module.exports = router
