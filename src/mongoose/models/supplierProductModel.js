const mongoose = require('mongoose')

const supplierProductSchema = mongoose.Schema(
  {
    supplierOwner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Supplier',
    },
    product: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
    },
    offer: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const SupplierProduct = mongoose.model('SupplierProduct', supplierProductSchema)

module.exports = SupplierProduct
