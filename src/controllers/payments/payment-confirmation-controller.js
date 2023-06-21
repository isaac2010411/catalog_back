'use strict'

const asyncHandler = require('express-async-handler')
const Order = require('../../mongoose/models/orderModel')
const { formatCurrencyToNum } = require('../../utils/formatters')
const serviceRequest = require('../../utils/services')

// @desc    Post generate payment link from mercadopago
// @route   Post /api/products
// @access  Public / Admin

const payment_confirmation = asyncHandler(async (req, res) => {
  const orderId = req.params.id
  const socket = req.app.get('io')

  const order = await Order.findById(orderId)
  console.log(req.body.id)
  const mpUrl = `https://api.mercadopago.com/v1/payments/${req.body.data.id}`

  setTimeout(async () => {
    const {
      data,
    } = await serviceRequest(mpUrl, 'get')
    console.log(data)
    //     if (results && results.length > 0) {
    //       const { status, status_detail } = results.reverse()[0]

    //       //   if (status === 'approved') {
    //       //     order.products.forEach(async (item) => {
    //       //       const decreaseQuantity = order.products.find((product) => product._id === item._id).quantity

    //       //       const product = await Product.findById(item._id)
    //       //       await decrease_stock(product, decreaseQuantity)

    //       //       product.quantity = product.quantity - decreaseQuantity
    //       //       await product.save()
    //       //     })

    //       //     socket.in('user').emit(
    //       //       'new-purchase',
    //       //       order.products.map((product) => ({ _id: product._id, quantity: product.quantity }))
    //       //     )
    //       //     socket.in('admin').emit(
    //       //       'new-purchase',
    //       //       order.products.map((product) => ({ _id: product._id, quantity: product.quantity }))
    //       //     )
    //       //     socket.in('admin').emit('dashboard', {
    //       //       orders: 1,
    //       //       sell: formatCurrencyToNum(order.payment.totalAmount),
    //       //       ordersDetail: {
    //       //         id: order._id,
    //       //         created: order.created,
    //       //         type: 'venta',
    //       //         paymentStatus: status_detail,
    //       //         paymentDetail: status,
    //       //         totalAmount: formatCurrencyToNum(order.payment.totalAmount),
    //       //       },
    //       //       stock: order.products.map((product) => ({ _id: product._id, quantity: product.quantity })),
    //       //     })
    //       //   }

    //       //   await Order.updateOne(
    //       //     { _id: orderId },
    //       //     {
    //       //       $set: {
    //       //         payment: { ...order.payment, paymentStatus: status, paymentDetail: status_detail },
    //       //       },
    //       //     }
    //       //   )
    //     }
  }, 3000)
  // console.log(resp)
  res.status(201).end()
})

module.exports = payment_confirmation
