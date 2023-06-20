'use strict'

const asyncHandler = require('express-async-handler')
const Notification = require('../../mongoose/models/notificationModel')

// @desc    Get all ordersby user
// @route   GET /api/myorders
// @access   Private
const get_notification_list = asyncHandler(async (req, res) => {
  let notifications = await Notification.aggregate([
    { $match: { user: req.user._id } },
    {
      $lookup: {
        from: 'payments',
        localField: 'pReference',
        foreignField: '_id',
        as: 'payment',
      },
    },
    {
      $unwind: { path: '$payment', preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        _id: 1,
        user: 1,
        title: 1,
        message: 1,
        type: 1,
        view: 1,
        isDeleted: 1,
        created: 1,
        'paymentLink': '$payment.paymentLink',
      },
    },
  ]).sort({ created: -1 })
  res.status(200).json(notifications)
})

module.exports = get_notification_list
