const { find_one_user_by_criterial, new_user, find_users_by_admin } = require('./user-repository')
const { new_log } = require('./log-repository')

module.exports = {
  //User
  new_user,
  find_one_user_by_criterial,
  find_users_by_admin,
  //Log
  new_log,
  //Categor
}
