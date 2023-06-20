const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
  products: [
    {
      title: {
        type: String,
        required: true,
      },
      publicPrice: {
        type: String,
        required: true,
      },
      supplierPrice: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      supplierName: {
        type: String,
        required: true,
      },
    },
  ],
  created: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['created', 'packaging', 'onDelivery', 'delivered', 'canceled'],
    default: 'created',
  },
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
