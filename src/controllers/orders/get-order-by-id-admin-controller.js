'use strict'

const asyncHandler = require('express-async-handler')
const Order = require('../../mongoose/models/orderModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

// @desc    Get all orders
// @route   GET /api/orders/orderId
// @access  Public / Admin
const get_orders_by_orderId_admin = asyncHandler(async (req, res) => {
  const { orderId } = req.params
  const { role } = req.user
  const isAdministrator = role === 'superadministrator' || role === 'administrator'
  var mpresults
  let order = await Order.aggregate([
    {
      $match: { _id: ObjectId(orderId) },
    },
    {
      $lookup: {
        from: 'payments',
        localField: '_id',
        foreignField: 'orderId',
        as: 'payment',
      },
    },
    {
      $lookup: {
        from: 'addresses',
        localField: 'address',
        foreignField: '_id',
        as: 'address',
      },
    },
    {
      $unwind: { path: '$address', preserveNullAndEmptyArrays: true },
    },
    {
      $unwind: { path: '$payment', preserveNullAndEmptyArrays: true },
    },
    {
      $unwind: { path: '$order', preserveNullAndEmptyArrays: true },
    },
    {
      $sort: { createdAt: -1 },
    },
  ])

  if (order.length > 0) {
    order = order[0]
  }

  res.status(200).json(order)
})

module.exports = get_orders_by_orderId_admin
