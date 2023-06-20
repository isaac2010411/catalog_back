'use strict'

const auth_user = require('./auth-user-controller')
const get_all_users = require('./get-all-users-controller')
const register_user_by_admin = require('./register-user-by-admin-controller')
const register_user = require('./register-user-controller')
const update_my_user = require('./update-my-user-controller')
const update_user_by_admin = require('./update-user-by-admin-controller')
const delete_users = require('./delete-user-controller')

module.exports = {
  auth_user,
  get_all_users,
  register_user_by_admin,
  register_user,
  update_my_user,
  update_user_by_admin,
  delete_users,
}
