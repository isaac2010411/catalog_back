'use strict'

const socket = require('socket.io')

const socketConfig = (httpServer) => {
  const io = socket(httpServer, {
    cors: {
      origin: process.env.REACT_APP,
      methods: ['GET', 'POST', 'PUT'],
      credentials: true,
    },
  })

  return io
}

module.exports = {
  socketConfig,
}
