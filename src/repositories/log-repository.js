'use strict'

const Log = require('../mongoose/models/logModel')

/**
 * @param {Object} params
 * @returns log object created
 */
async function new_log(params) {
  return new Log(params)
}

module.exports = {
  new_log,
}
