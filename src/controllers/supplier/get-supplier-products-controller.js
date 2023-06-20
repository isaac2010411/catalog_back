'use strict'

const asyncHandler = require('express-async-handler')
const SupplierProduct = require('../../mongoose/models/supplierProductModel')

// @desc    GET all suppliers
// @route   GET /api/suppliers
// @access  Private/Admin
const get_supplier_products = asyncHandler(async (req, res) => {
  const { page } = req.query

  const limit = 12
  const skip = limit * Number(page ? page : 0)

  const suppliers = await SupplierProduct.aggregate([
    { $match: { stock: { $exists: false } } },
    {
      $lookup: {
        from: 'suppliers',
        localField: 'supplierOwner',
        foreignField: '_id',
        as: 'supplier',
      },
    },
    {
      $unwind: '$supplier',
    },
    { $sort: { productName: 1 } },
    {
      $facet: {
        metadata: [{ $count: 'total' }, { $addFields: { page: Number(page) } }],
        data: [{ $skip: skip }, { $limit: limit }], // add projection here wish you re-shape the docs
      },
    },
  ])
  const pages = (suppliers[0].metadata[0].total - 12) / limit

  suppliers[0].metadata[0]['pages'] = Math.round(pages)

  res.status(200).json(suppliers[0])
})

module.exports = get_supplier_products
