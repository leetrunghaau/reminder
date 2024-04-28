const createError = require('http-errors');
const AccountService = require('../services/account-service');

class AccountController {

    //get acc 

    static async getAccount(req, res, next) {
        try {
            const Accounts = await AccountService.getAccountById(req.userId);
            if (!Accounts) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Accounts
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }

    //update update
    static async updateAccount(req, res, next) {
        try {
            const reqValue = req.body;
            const databaseValue = await AccountService.getAccountById(req.userId);
            //kiểm tra email mới có trùng với trong database hay không
            if (reqValue.email != databaseValue.email) {
                const checkEmail = await AccountService.getAccountByEmail(reqValue.email);
                if (checkEmail) {
                    return next(createError.BadRequest("email đã được đăng ký"))
                }
            }
            
            //kiểm tra userName mới có trùng với trong database hay không
            if (reqValue.userName != databaseValue.userName) {
                const checkUserName = await AccountService.getAccountByUserName(reqValue.userName);
                if (checkUserName) {
                    return next(createError.BadRequest("userName đã được đăng ký"))
                }
            }
            const Account = await AccountService.updateAccount(req.userId, reqValue);
            if (!Account) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: 'done',
                data: Account,
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    //delete delete
    static async deleteAccount(req, res, next) {
        try {
            const Accounts = await AccountService.deleteAccountById(req.userId);
            if (Accounts <= 0) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done"
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
}

module.exports = AccountController;
