'use strict'

const asyncHandler = require('express-async-handler')
const axios = require('axios')
const mercadopago = require('mercadopago')
const Order = require('../../mongoose/models/orderModel')
const Payment = require('../../mongoose/models/paymentModel')
const { usersConnected } = require('../../utils/handleSocket')
const { get } = require('../../routes')
const Notification = require('../../mongoose/models/notificationModel')
const User = require('../../mongoose/models/userModel')

// @desc    GET all suppliers
// @route   GET /api/suppliers
// @access  Private/Admin
const genetate_link = asyncHandler(async (req, res) => {
  const socket = req.app.get('io')

  try {
    mercadopago.configure({
      access_token: 'TEST-5596602335077800-062011-a92c8754ad310db93b0197dd8491d76c-1180291404',
    })

    const getOrder = await Order.findById(req.body._id)

    const amount = getOrder.products
      .map((p) => p.publicPrice)
      .reduce((previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue), 0)
      .toFixed(2)

    const items = getOrder.products.map((product) => {
      return {
        id: product._id,
        title: product.title,
        unit_price: parseFloat(product.publicPrice),
        quantity: Number(product.quantity),
      }
    })
    const preferences = {
      external_reference: req.body._id.toString(),
      purpose: 'wallet_purchase',
      items: items,
      statement_descriptor: 'Hypnotic Grow',
      back_urls: {
        failure: process.env.PAYMENT_RESPONSE_URL,
        pending: process.env.PAYMENT_RESPONSE_URL,
        success: process.env.PAYMENT_RESPONSE_URL,
      },
      auto_return: 'all',
      date_of_expiration: req.body.date_of_expiration,
    }

    if (process.env.NODE_ENV === 'production') {
      preferences.notification_url = `${process.env.PAYMENT_NOTIFICATION_RESPONSE}/${req.body._id}?source_news=webhooks`
    }

    const p = await mercadopago.preferences.create(preferences)

    const payment = await Payment.create({
      orderId: req.body._id,
      userId: getOrder.user,
      total: amount,
      paymentLink: p.body.sandbox_init_point,
      expirationDate: req.body.date_of_expiration,
      created: new Date(),
      status: 'pending',
    })

    //notification creator
    const notification = await Notification.create({
      title: 'Link creado',
      message: `El link para que puedas terminar tu compra fue creado, para continuar por favor presiona pagar, este se vence dentro de [${req.body.date_of_expiration}].
Recorda que para asegurarte el stock deberas abonar primero`,
      created: new Date(),
      type: 'link',
      user: getOrder.user,
      pReference: payment._id,
    })

    await notification.save()

    const userSocketConnected = usersConnected.find((person) => person.userId === getOrder.user.toString())
    if (userSocketConnected) {
      notification._doc['paymentLink'] = p.body.sandbox_init_point

      socket.to(userSocketConnected.socketId).emit('new-notification', {
        ...notification._doc,
        view: false,
        isDelete: false,
      })
    }

    console.log(p)
    res.status(200).json({})
  } catch (error) {
    console.log(error)
  }
})

module.exports = genetate_link
