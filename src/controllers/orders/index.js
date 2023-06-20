const generate_order = require('./register-order-controller')
const get_orders_by_user_id = require('./get-orders-by-user-id-controller')
const get_all_orders_by_admin = require('./get-orders-by-admin-controller')
const get_orders_by_orderId_admin = require('./get-order-by-id-admin-controller')
const update_order_state = require('./update-order-state-controller')

module.exports = {
  generate_order,
  update_order_state,
  get_orders_by_user_id,
  get_all_orders_by_admin,
  get_orders_by_orderId_admin,
}
