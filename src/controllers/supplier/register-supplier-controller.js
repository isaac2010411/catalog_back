'use strict'

const asyncHandler = require('express-async-handler')
const Supplier = require('../../mongoose/models/supplierModel')

// @desc    Create user
// @route   POST /api/users/by-admin
// @access  Public
const register_supplier = asyncHandler(async (req, res) => {
  const { supplierName, supplierPhone, supplierAddress } = req.body

  const supplier = new Supplier({ supplierName, supplierPhone, supplierAddress })

  await supplier.save()

  res.status(201).json(supplier)
})

module.exports = register_supplier
