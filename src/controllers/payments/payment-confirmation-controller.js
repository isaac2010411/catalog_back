'use strict'

const asyncHandler = require('express-async-handler')
const Order = require('../../mongoose/models/orderModel')
const { formatCurrencyToNum } = require('../../utils/formatters')
const serviceRequest = require('../../utils/services')
const Payment = require('../../mongoose/models/paymentModel')

// @desc    Post generate payment link from mercadopago
// @route   Post /api/products
// @access  Public / Admin

const payment_confirmation = asyncHandler(async (req, res) => {
  const orderId = req.params.id
  const socket = req.app.get('io')

  const order = await Payment.findOne({ orderId })
  console.log(req.body.id)

  if (req.body.type === 'payment') {
    const mpUrl = `https://api.mercadopago.com/v1/payments/${req.body.data.id}`

    setTimeout(async () => {
      const { data } = await serviceRequest(mpUrl, 'get')

      const { status, status_detail } = data
      console.log(status, status_detail)
      if (status === 'approved') {
        console.log(status, status_detail, 'approved')
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
        await Payment.updateOne(
          { orderId },
          {
            $set: {
              status: status === 'approved' ? 'paid' : 'canceled',
              paymentDetail: status_detail,
              mpResponse: {
                action: req.body.action,
                date_created: req.body.date_created,
                id: req.body.data.id,
                type: req.body.type,
              },
            },
          }
        )
      }
    }, 3000)
  }

  // console.log(resp)
  res.status(201).end()
})

module.exports = payment_confirmation
