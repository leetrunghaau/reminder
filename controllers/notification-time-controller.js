const createError = require('http-errors');
const NotificationTimeService = require('../services/notification-time-service');

class NotificationTimeController {

    static async getNotificationTimeById(req, res, next) {
        try {
            const NotificationTimes = await NotificationTimeService.getNotificationTimeById(req.params.notificationTimeId);
            if (!NotificationTimes) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: NotificationTimes
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async getAllNotificationTimeByReminderId(req, res, next) {
        try {
            const NotificationTimes = await NotificationTimeService.getAllNotificationTimeByReminderId(req.params.reminderId);
            if (!NotificationTimes) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: NotificationTimes
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async createNotificationTime(req, res, next) {
        try {
            let value = req.body;
            value.accountId = req.userId;
            const NotificationTime = await NotificationTimeService.createNotificationTime(value);
            if (!NotificationTime) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: NotificationTime
            });
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async updateNotificationTime(req, res, next) {
        try {
            let { id, ...value } = req.body
            const NotificationTime = await NotificationTimeService.updateNotificationTime(id, value);
            if (!NotificationTime) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: 'done',
                data: NotificationTime,
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async deleteNotificationTime(req, res, next) {
        try {
            const NotificationTime = await NotificationTimeService.deleteNotificationTimeById(req.params.id);
            if (NotificationTime <= 0) {
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

module.exports = NotificationTimeController;
