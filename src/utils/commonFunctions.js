const { formatCurrencyToNum } = require('./formatters')

const amountReducer = (amounts) => {
  return amounts
    .map((item) => formatCurrencyToNum(item.publicPrice) * item.quantity)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
}

const changeProductFields = (productsRecords, productsRequired) => {
  return productsRecords.map((product) => {
    return {
      _id: product._id,
      category: product.category.name,
      brand: product.brand.name,
      description: product.description,
      title: product.name,
      publicPrice: product.publicPrice,
      quantity: productsRequired.find((item) => item._id === product._id.toString()).quantity,
      image: product.image,
    }
  })
}

const sumProductsAndShippingAmounts = (productAmount, shippingAmount) => {
  productAmount = typeof productAmount === 'string' ? formatCurrencyToNum(productAmount) : productAmount
  shippingAmount = typeof shippingAmount === 'string' ? formatCurrencyToNum(shippingAmount) : shippingAmount

  const sum = productAmount + shippingAmount

  return sum
}

const generateRandomPassword = (num) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result1 = ''
  const charactersLength = characters.length
  for (let i = 0; i < num; i++) {
    result1 += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result1
}


module.exports = {
  amountReducer,
  changeProductFields,
  sumProductsAndShippingAmounts,
  generateRandomPassword
}
