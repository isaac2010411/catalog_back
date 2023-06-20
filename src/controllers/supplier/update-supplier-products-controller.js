'use strict'
const fs = require('fs')
const asyncHandler = require('express-async-handler')
const Supplier = require('../../mongoose/models/supplierModel')
const { FIELDS_SIMPLE_NOTE } = require('../../config/multer/fieldsNames')
const path = require('path')
const SupplierProduct = require('../../mongoose/models/supplierProductModel')
// @desc    Create user
// @route   POST /api/users/by-admin
// @access  Public
const update_supplier_product = asyncHandler(async (req, res) => {
  const file = req?.files && req?.files[FIELDS_SIMPLE_NOTE] && req?.files[FIELDS_SIMPLE_NOTE][0]

  if (file.path) {
    const rootPath = __dirname.replace('src', '').replace('supplier', '').replace('controllers', '')

    console.log(path.resolve(rootPath.concat('public/assets/files/products/p.json')))
    fs.readFile(path.resolve(rootPath.concat('public/assets/files/products/p.json')), 'utf8', async (err, data) => {
      if (err) {
        return
      }
      const products = JSON.parse(data)

      const addOwner = JSON.parse(data).map((element) => {
        return {
          ...element,
          supplierOwner: '645d8f06b54e6d362fd1eaa1',
        }
      })

      let count = 0

      while (count !== products.length) {
        const p = addOwner[count]
        console.log(p)
        if (p.price && p.product && p.image) {
          await SupplierProduct(p).save()
        }
        count++
      }
    })
  }

  res.status(201).json({})
})

module.exports = update_supplier_product
