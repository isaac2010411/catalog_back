const Stock = require('../mongoose/models/stockModel')
const ObjectId = require('mongoose').Types.ObjectId
const decrease_stock = async (product, decreaseQuantity) => {
  const stocks = await Stock.find({ product: product._id, quantity: { $gt: 0 }, type: { $ne: 'sell' } })

  let count = 0
  let rest = decreaseQuantity

  while (count !== stocks.length) {
    const currentStock = stocks[count]

    if (rest !== 0) {
      if (currentStock && rest >= currentStock.quantity) {
        await Stock.updateOne({ _id: currentStock._id }, { $set: { quantity: 0 } })
        rest = rest - currentStock.quantity

        const sell = await Stock.create({
          product: product._id,
          type: 'substract',
          unitPrice: currentStock.unitPrice,
          publicPrice: product.publicPrice,
          quantity: currentStock.quantity,
          unitOfMeasurement: currentStock.unitOfMeasurement,
          created: new Date(),
        })

        await sell.save()
      } else {
        await Stock.updateOne({ _id: currentStock._id }, { $set: { quantity: currentStock.quantity - rest } })
        rest = currentStock.quantity - rest
        const sell = await Stock.create({
          product: product._id,
          publicPrice: product.publicPrice,
          type: 'substract',
          unitPrice: currentStock.unitPrice,
          quantity: currentStock.quantity - rest,
          unitOfMeasurement: currentStock.unitOfMeasurement,
          created: new Date(),
        })
        await sell.save()
      }
    }

    count = count + 1
  }
}

const calculate_stock = async (product) => {
  const stockQuantity = await Stock.aggregate([
    {
      $match: { product: ObjectId(product), quantity: { $gt: 0 } },
    },
    {
      $group: {
        _id: null,
        quantity: { $sum: '$quantity' },
        total: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: null,
        quantity: 1,
        total: 1,
      },
    },
  ]).sort({ created: 1 })
  if (!stockQuantity) {
    return {
      quantity: 0,
      total: 0,
    }
  }

  return {
    quantity: stockQuantity[0].quantity,
    total: stockQuantity[0].total,
  }
}

module.exports = {
  decrease_stock,
  calculate_stock,
}
