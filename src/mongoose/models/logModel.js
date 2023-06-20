const mongoose = require('mongoose')

const logSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['action', 'error', 'none'],
      default: 'none',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    record: {
      type: String,
    },
    errorMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Log = mongoose.model('Log', logSchema)

module.exports = Log
