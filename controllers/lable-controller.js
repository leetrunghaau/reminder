const createError = require('http-errors');
const LableService = require('../services/lable-service');

class LableController {

    static async getLableById(req, res, next) {
        try {
            const Lables = await LableService.getLableById(req.params.lableId);
            if (!Lables) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Lables
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async getAllLable(req, res, next) {
        try {
            const Lables = await LableService.getAllLableByAccountId(req.userId);
            if (!Lables) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Lables
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async createLable(req, res, next) {
        try {
            let value = req.body;
            value.accountId = req.userId;
            const Lable = await LableService.createLable(value);
            if (!Lable) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Lable
            });
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async updateLable(req, res, next) {
        try {
            let { id, ...value } = req.body
            value.accountId = req.userId;
            const Lable = await LableService.updateLable(id, value);
            if (!Lable) {
                return next(createError.BadRequest("vui lòng nhập đúng thông tin id, hoạc đăng nhập lại"));
            }
            return res.status(200).json({
                status: 200,
                message: 'Cập nhật thành công',
                data: Lable,
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async deleteLable(req, res, next) {
        try {
            const Lable = await LableService.deleteLableById(req.params.id);
            if (Lable <= 0) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: 'đã xóa thành công',
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }


}

module.exports = LableController;
