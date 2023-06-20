'use strict'

const express = require('express')
const router = express.Router()

const user_routes = require('./user-routes')
const supplier_routes = require('./supplier-routes')
const address_routes = require('./address-routes')
const payment_routes = require('./payment-routes')
const order_routes = require('./order-routes')
const my_order_routes = require('./my-order-routes')
const notification_routes = require('./notification-routes')

router.use('/users', user_routes)
router.use('/suppliers', supplier_routes)
router.use('/addresses', address_routes)
router.use('/orders', order_routes)
router.use('/payments', payment_routes)
router.use('/my-orders', my_order_routes)
router.use('/notifications', notification_routes)

module.exports = router
