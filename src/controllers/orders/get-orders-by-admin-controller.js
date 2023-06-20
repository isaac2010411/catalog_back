'use strict'

const asyncHandler = require('express-async-handler')
const Order = require('../../mongoose/models/orderModel')

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public / Admin
const get_all_orders = asyncHandler(async (req, res) => {
  const { _id, role } = req.user

  let orders

  if (role !== 'administrator') {
    orders = await Order.aggregate([
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
          from: 'users',
          localField: 'user.owner',
          foreignField: '_id',
          as: 'owner',
        },
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
        $unwind: { path: '$user', preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: '$address', preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: '$owner' },
      },
      {
        $unwind: { path: '$payment', preserveNullAndEmptyArrays: true },
      },
      {
        $sort: { created: -1 },
      },
    ])
  } else {
    orders = await Order.aggregate([
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
          from: 'users',
          localField: 'user.owner',
          foreignField: '_id',
          as: 'owner',
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
      { $match: { 'owner._id': _id } },
      {
        $unwind: { path: '$user', preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: '$address', preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: '$owner', preserveNullAndEmptyArrays: true },
      },

      {
        $sort: { created: -1 },
      },
    ])
  }

  res.status(200).json(orders)
})

module.exports = get_all_orders
