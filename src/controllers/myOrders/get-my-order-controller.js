'use strict'

const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const Order = require('../../mongoose/models/orderModel')
const ObjectId = mongoose.Types.ObjectId

// @desc    Get all ordersby user
// @route   GET /api/myorders
// @access   Private
const get_my_order = asyncHandler(async (req, res) => {
  let orders = await Order.aggregate([
    {
      $match: { _id: ObjectId(req.params.id), user: ObjectId(req.user._id) },
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
      $unwind: { path: '$payment', preserveNullAndEmptyArrays: true },
    },
    {
      $unwind: { path: '$address', preserveNullAndEmptyArrays: true },
    },
    {
      $sort: { created: 1 },
    },
  ])
  if (orders.length > 0) {
    orders = orders[0]
  }
  console.log(orders)
  res.status(200).json(orders)
})

module.exports = get_my_order
