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
  expirationDate: {
    type: Date,
  },
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment
