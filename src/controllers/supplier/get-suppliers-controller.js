'use strict'

const asyncHandler = require('express-async-handler')
const Supplier = require('../../mongoose/models/supplierModel')

// @desc    GET all suppliers
// @route   GET /api/suppliers
// @access  Private/Admin
const get_suppliers = asyncHandler(async (req, res) => {
  const suppliers = await Supplier.find()

  res.status(200).json(suppliers)
})

module.exports = get_suppliers
