'use strict'

const User = require('../mongoose/models/userModel')

/**
 * @param {Object} criterial
 * @returns {Object | null} user object with no password field or null
 */
async function find_one_user_by_criterial(criterial) {
  const user = User.findOne(criterial)

  return user
}
/**
 * @returns user list
 */
async function find_users_by_admin() {
  return User.find().select('-password')
}
/**
 * @param {Object} params
 * @returns user object created
 */
async function new_user(params) {
  return User.create(params)
}
/**
 * @param {Object} params
 * @returns user object created
 */
async function update_user(user) {
  return user.save()
}
/**
 * @param {Object} params
 * @returns user deleted
 */
async function delete_user(user) {
  return user.remove()
}

module.exports = {
  find_one_user_by_criterial,
  find_users_by_admin,
  new_user,
  update_user,
  delete_user,
}
