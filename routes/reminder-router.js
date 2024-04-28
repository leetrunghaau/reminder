const express = require('express');
const router = express.Router();
const ReminderController = require('../controllers/reminder-controller');
const { authorization } = require('../middlewares/auth-middleware');

// Define routes
router.get("/reminders", authorization(), ReminderController.getAllReminder);
router.post("/reminder", authorization(), ReminderController.createReminder);
router.put("/reminder", authorization(), ReminderController.updateReminder);
router.delete("/reminder/:id", authorization(), ReminderController.deleteReminder);
module.exports = router;
