'use strict'

const asyncHandler = require('express-async-handler')
const Order = require('../../mongoose/models/orderModel')

// @desc    PUT all update order
// @route   PUT /api/orders/:id
// @access  Public / Admin
const update_order_state = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body

  if (!orderStatus) {
    res.status(404)
    throw new Error('Parametros no validos.')
  }
  console.log(req.params.id, orderStatus)
  await Order.updateOne({ _id: req.params.id }, { $set: { status: orderStatus } })

  res.status(200).json({
    _id: req.params.id,
    status: orderStatus,
  })
})

module.exports = update_order_state
