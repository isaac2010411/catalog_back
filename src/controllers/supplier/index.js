const get_suppliers = require('./get-suppliers-controller')
const register_supplier = require('./register-supplier-controller')
const update_supplier_product = require('./update-supplier-products-controller')
const get_supplier_products = require('./get-supplier-products-controller')

module.exports = {
  get_suppliers,
  register_supplier,
  update_supplier_product,
  get_supplier_products,
}
