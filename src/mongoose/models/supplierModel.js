const mongoose = require('mongoose')

const supplierSchema = mongoose.Schema(
  {
    supplierName: {
      type: String,
      required: true,
    },
    supplierPhone: {
      type: String,
      required: true,
    },
    supplierAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Supplier = mongoose.model('Supplier', supplierSchema)

module.exports = Supplier
