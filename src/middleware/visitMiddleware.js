const asyncHandler = require('express-async-handler')
const Visit = require('../mongoose/models/visitModel')

const visitMiddleware = asyncHandler(async (req, res, next) => {
  const { date } = req.query

  if (date) {
    let visitors = await Visit.findOne({ date })
    if (!visitors) {
      await Visit.create({
        date,
        quantity: 1,
      })
    } else {
      visitors.quantity = visitors.quantity + 1
      await visitors.save()
    }
  }

  next()
})

module.exports = { visitMiddleware }
