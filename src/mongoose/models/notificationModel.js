const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  viewDate: {
    type: Date,
  },
  view: {
    type: Boolean,
    default: false,
  },
  pReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payments',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    required: true,
  },
})

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification
