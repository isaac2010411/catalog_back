const jwt = require('jsonwebtoken')

const generate_token = (id, expiresIn) => {
  return jwt.sign(id, process.env.JWT_SECRET, {
    expiresIn: expiresIn ? expiresIn : '30d',
  })
}

module.exports = generate_token
