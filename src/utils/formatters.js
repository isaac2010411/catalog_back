const formatNumToCurrency = (num) => {
  num = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(num)
  return num.replace('€', '').trim()
}
const formatCurrencyToNum = (num) => {
  num = num.replace('.', '').replace(',', '.')
  return Number(num)
}

module.exports = {
  formatNumToCurrency,
  formatCurrencyToNum,
}
