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
  shippingPrice: {
    type: String,
  },
  productsPrice: {
    type: String,
  },
  total: {
    type: String,
  },
  paymentLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'canceled', 'paid'],
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
  net_received_amount: { type: String },
  fee_details: [
    {
      amount: { type: Number },
      fee_payer: { type: String },
    },
  ],
  paymentId: { type: Number },
  payment_method_id: { type: String },
  expirationDate: {
    type: Date,
  },
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment
