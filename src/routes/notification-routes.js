'use strict'

const express = require('express')
const router = express.Router()

const { get_notification_list } = require('../controllers/notifications')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, get_notification_list)

module.exports = router
