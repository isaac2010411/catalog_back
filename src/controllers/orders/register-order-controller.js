'use strict'

const asyncHandler = require('express-async-handler')
const SupplierProduct = require('../../mongoose/models/supplierProductModel')
const Order = require('../../mongoose/models/orderModel')

// @desc    Post generate payment link from mercadopago
// @route   Post /api/products
// @access  Public / Admin
const generate_order = asyncHandler(async (req, res) => {
  const { products, addressIdOrder } = req.body
  const socket = req.app.get('io')
  const user = req.user

  const productIds = products.map((item) => item._id)

  const productRecords = await SupplierProduct.find({ _id: { $in: productIds } })

  const orders = productRecords.map((item, i) => {
    return {
      title: item.product,
      publicPrice: products[i].price,
      supplierPrice: item.price,
      quantity: products[i].quantity,
      supplierName: products[i].supplierName,
    }
  })

  const order_obj = new Order({
    products: orders,
    user: user._id,
    created: new Date(),
    address: addressIdOrder,
  })
  socket.in('admin').emit('new-notification', {
    _id: new Date(),
    title: 'Nueva Orden',
    message: `Se ah generado una nueva orden en la tienda, por favor revisar.`,
    created: new Date(),
    type: 'order',
    user: user._id,
  })
  await order_obj.save()
  res.status(200).json(order_obj)
})

module.exports = generate_order
