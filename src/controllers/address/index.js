const register_address = require('./register-address-controller')
const get_address_by_user_id = require('./get-address-by-user-id-controller')
const update_address = require('./update-address-controller')
const delete_address = require('./delete-address-controller')
const update_address_coordinates = require('./update-address-coordinates-controller')

module.exports = {
  register_address,
  get_address_by_user_id,
  update_address,
  delete_address,
  update_address_coordinates,
}
