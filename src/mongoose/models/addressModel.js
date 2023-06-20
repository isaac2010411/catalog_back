const mongoose = require('mongoose')

const addressSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    cp: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    doorOrFloor: {
      type: String,
    },
    street: {
      type: String,
      required: true,
    },
    intersection1: {
      type: String,
      required: true,
    },
    intersection2: {
      type: String,
      required: true,
    },
    contactPhone: {
      type: String,
      required: true,
    },
    aditionalInfo: {
      type: String,
      required: true,
    },
    coordinates: [
      {
        type: {
          type: String,
          enum: ['Point'],
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
    ],
    isCoordinatesChecked: {
      type: Boolean,
      default: false,
    },
    shippingPrice: {
      Type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Address = mongoose.model('Address', addressSchema)

module.exports = Address
