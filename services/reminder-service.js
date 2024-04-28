
const { generateKey } = require('crypto');
const Reminder = require('../models/reminder-model');
const { generateId, generateRandomString } = require('../helpers/generate-key');

class ReminderService {
  static async getReminderById(id) {
    return Reminder.findByPk(id);
  }
  static async getAllReminder() {
    return Reminder.findAll();
  }
  static async getAllReminderByAccountId(accountId) {
    return Reminder.findAll({ where: { accountId: accountId } });
  }
  static async createReminder(reminderData) {
    return Reminder.create(reminderData);
  }

  static async updateReminder(id, reminderData) {
    await Reminder.update(reminderData, {
      where: { id: id },
    });
    return this.getReminderById(id);
  }

  static async deleteReminderById(id) {
    return Reminder.destroy({
      where: { id: id },
    });
  }
}

module.exports = ReminderService;
