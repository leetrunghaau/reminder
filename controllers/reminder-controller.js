const createError = require('http-errors');
const ReminderService = require('../services/Reminder-service');

class ReminderController {

    static async getReminderById(req, res, next) {
        try {
            const Reminders = await ReminderService.getReminderById(req.params.reminderId);
            if (!Reminders) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Reminders
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async getAllReminder(req, res, next) {
        try {
            const Reminders = await ReminderService.getAllReminderByAccountId(req.userId);
            if (!Reminders) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Reminders
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async createReminder(req, res, next) {
        try {
            let value = req.body;
            value.accountId = req.userId;
            const Reminder = await ReminderService.createReminder(value);
            if (!Reminder) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Reminder
            });
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async updateReminder(req, res, next) {
        try {

            let { id, ...value } = req.body
            const Reminder = await ReminderService.updateReminder(id, value);
            if (!Reminder) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: 'done',
                data: Reminder,

            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async deleteReminder(req, res, next) {
        try {

            const Reminder = await ReminderService.deleteReminderById(req.params.id);
            if (Reminder <= 0) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: 'done',
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
}
module.exports = ReminderController;
