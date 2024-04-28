
const { generateKey } = require('crypto');
const NotificationTime = require('../models/notification-time-model');
const { generateId, generateRandomString } = require('../helpers/generate-key');

class NotificationTimeService {
  static async getNotificationTimeById(id) {
    return NotificationTime.findByPk(id);
  }
  
  static async getAllNotificationTime() {
    return NotificationTime.findAll();
  }
  static async getAllNotificationTimeByReminderId(reminderId) {
    return NotificationTime.findAll({where:{reminderId: reminderId}});
  }
  static async createNotificationTime(notificationTimeData) {
    return NotificationTime.create(notificationTimeData);
  }

  static async updateNotificationTime(id, notificationTimeData) {
    await NotificationTime.update(notificationTimeData, {
      where: { id: id },
    });
    return this.getNotificationTimeById(id);
  }

  static async deleteNotificationTimeById(id) {
    return NotificationTime.destroy({
      where: { id: id },
    });
  }
}

module.exports = NotificationTimeService;
