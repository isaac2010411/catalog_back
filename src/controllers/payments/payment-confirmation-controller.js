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

  // const order = await Payment.findOne({ orderId })

  if (req.body.type === 'payment') {
    const mpUrl = `https://api.mercadopago.com/v1/payments/${req.body.data.id}`

    setTimeout(async () => {
      const { data } = await serviceRequest(mpUrl, 'get')

      const { id, status, status_detail, transaction_details, fee_details, payment_method_id } = data

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
            net_received_amount: transaction_details.net_received_amount.toString(),
            payment_method_id: payment_method_id.toString(),
            paymentId: id,
          },
          $push: {
            fee_details: fee_details.map((i) => ({ amount: i.amount.toString(), fee_payer: i.fee_payer })),
          },
        }
      )
    }, 3000)
  }

  res.status(201).end()
})

module.exports = payment_confirmation
