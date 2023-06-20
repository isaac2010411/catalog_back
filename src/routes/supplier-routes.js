'use strict'

const express = require('express')
const router = express.Router()

const {
  get_suppliers,
  register_supplier,
  update_supplier_product,
  get_supplier_products,
} = require('../controllers/supplier')
const { protect } = require('../middleware/authMiddleware')
const { upload } = require('../config/multer/config')
const { FIELDS_SIMPLE_NOTE } = require('../config/multer/fieldsNames')

router.route('/').post(register_supplier).get(protect, get_suppliers)
router.route('/products').get(protect, get_supplier_products)

router.route('/:id').put(upload.fields([{ name: FIELDS_SIMPLE_NOTE }]), update_supplier_product)

module.exports = router
