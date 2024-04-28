// index.js
const express = require('express');
const router = express.Router();

const sigRouter = require('./sig-router')
const accountRouter = require('./account-router')
const lableRouter = require('./lable-router')
const reminderRouter = require('./reminder-router')
const notificationTimeRouter = require('./notification-time-router')



router.use(sigRouter);
router.use(accountRouter);
router.use(lableRouter);
router.use(reminderRouter);
router.use(notificationTimeRouter);
module.exports = router;

