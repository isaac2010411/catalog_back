const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  total: {
    type: String,
  },
  paymentLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ['generated', 'canceled', 'paid'],
    default: 'generated',
  },
  created: {
    type: Date,
  },
  mpResponse: {
    action: { type: String },
    date_created: { type: Date },
    id: { type: String },
    type: { type: String },
  },
  paymentDetail: {
    type: String,
  },
  expirationDate: {
    type: Date,
  },
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment
