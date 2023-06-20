'use strict'

const express = require('express')
const dotenv = require('dotenv')
const { createServer } = require('http')
const cors = require('cors')
const path = require('path')
const connectDB = require('../../mongoose/db')
const apiRoutes = require('../../routes')
const { notFound, errorHandler } = require('../../middleware/errorMiddleware.js')
const { socketConfig } = require('./socket-config')
const { handleSocket } = require('../../utils/handleSocket')

// Server Config
dotenv.config()
connectDB()

//apply middlewares
const app = express()

const httpServer = createServer(app)

const io = socketConfig(httpServer)

app.use(cors())
app.use(express.json({ limit: '3mb' }))
app.set('io', io)
//  Server Routes
app.use('/api', apiRoutes)

io.on('connection', handleSocket)

//  Config statics
app.use('/public', express.static(path.join(__dirname, '../../../public')))

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../../../public', 'index.html')))
}

// Server Middlewares
app.use(notFound)
app.use(errorHandler)

module.exports = httpServer
