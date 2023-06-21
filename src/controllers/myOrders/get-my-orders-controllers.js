'use strict'

const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const Order = require('../../mongoose/models/orderModel')
const ObjectId = mongoose.Types.ObjectId

// @desc    Get all ordersby user
// @route   GET /api/myorders
// @access   Private
const get_my_orders = asyncHandler(async (req, res) => {
  const orders = await Order.aggregate([
    {
      $match: { user: ObjectId(req.user._id) },
    },
    {
      $lookup: {
        from: 'payments',
        localField: '_id',
        foreignField: 'orderId',
        as: 'payments',
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
      $unwind: { path: '$payments', preserveNullAndEmptyArrays: true },
    },
    {
      $sort: { created: -1 },
    },
  ])

  res.status(200).json(orders)
})

module.exports = get_my_orders
