'use strict'

const mercadopago = require('mercadopago')
const { formatCurrencyToNum } = require('./formatters')

const preference_creator = async (orderId, productsRecords, productsRequired, shippingPrice, date_of_expiration) => {
  mercadopago.configure({
    access_token: process.env.MP_SECRET_TOKEN,
  })

  const items = productsRecords.map((product) => {
    return {
      id: product._id,
      category: product.category.name,
      brand: product.brand.name,
      description: product.description,
      title: product.name,
      unit_price: formatCurrencyToNum(product.publicPrice),
      quantity: productsRequired.find((item) => item._id === product._id.toString()).quantity,
      picture_url: product.image,
    }
  })

  const preferences = {
    external_reference: orderId.toString(),
    purpose: 'wallet_purchase',
    items: items,
    statement_descriptor: 'Hypnotic Grow',
    back_urls: {
      failure: process.env.PAYMENT_RESPONSE_URL,
      pending: process.env.PAYMENT_RESPONSE_URL,
      success: process.env.PAYMENT_RESPONSE_URL,
    },
    auto_return: 'all',
    date_of_expiration,
  }

  if (process.env.NODE_ENV === 'production') {
    preferences.notification_url = `${process.env.PAYMENT_NOTIFICATION_RESPONSE}/${orderId}?source_news=webhooks`
  }

  if (formatCurrencyToNum(shippingPrice) > 0) {
    preferences.shipments = {
      cost: formatCurrencyToNum(shippingPrice),
      mode: 'not_specified',
    }
  }

  return await mercadopago.preferences.create(preferences)
}

module.exports = preference_creator
