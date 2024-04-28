const express = require('express');
const router = express.Router();
const NotificationTimeController = require('../controllers/notification-time-controller');
const {  authorization } = require('../middlewares/auth-middleware');

// Define routes
router.get("/notificationTimes/reminderId/:reminderId", authorization() ,NotificationTimeController.getAllNotificationTimeByReminderId); 
router.post("/notificationTime", authorization() ,NotificationTimeController.createNotificationTime); 
router.put("/notificationTime",authorization() , NotificationTimeController.updateNotificationTime); 
router.delete("/notificationTime/:id",authorization() , NotificationTimeController.deleteNotificationTime); 
module.exports = router;
