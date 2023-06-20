'use strict'

const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const Order = require('../../mongoose/models/orderModel')
const ObjectId = mongoose.Types.ObjectId

// @desc    Get all orders
// @route   GET /api/orders/users/:id
// @access  Public / Admin
const get_orders_by_user_id = asyncHandler(async (req, res) => {
  const orders = await Order.aggregate([
    {
      $match: { user: ObjectId(req.params.id) },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
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
    // {
    //   $unwind: '$user',
    // },
    // {
    //   $unwind: '$address',
    // },
    {
      $sort: { createdAt: -1 },
    },
  ])

  res.status(200).json(orders)
})

module.exports = get_orders_by_user_id
