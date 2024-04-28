const { generateAccessToken } = require("../helpers/jwt");
const { comparePasswords, hashPassword } = require("../helpers/password-crypt");
const createError = require('http-errors');
const AccountService = require('../services/account-service');
const { generateRandomStringnumber } = require("../helpers/generate-key");

class SigController {

    //login
    static async login(req, res, next) {
        try {
            const acc = await AccountService.getAccountByUserName(req.body.userName);
            if (!acc) {
                return next(createError.NotFound(`Tài khoảng không tồn tại`))
            }
            const passwordCheck = await comparePasswords(req.body.password, acc.password);
            if (passwordCheck == false) {
                return next(createError.BadRequest('Không đúng mật khẩu'));
            }
            const token = await generateAccessToken(acc.id);
            return res.status(200).json({
                status: 200,
                message: 'login done',
                data: {
                    token: token
                }
            });

        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    };
    //đăng ký 
    static async sigup(req, res, next) {
        try {
            //kiểm tra email và user name  
            const checkEmail = await AccountService.getAccountByEmail(req.body.email);
            if (checkEmail) {
                return next(createError.BadRequest("email đã được đăng ký"))
            }
            const checkUserName = await AccountService.getAccountByUserName(req.body.userName);
            if (checkUserName) {
                return next(createError.BadRequest("userName đã được đăng ký"))
            }

            let data = req.body;
            data.password = await hashPassword(req.body.password);

            const account =  await AccountService.createAccount(data);
            if(!account){
                return next(createError.InternalServerError("lỗi hệ thống"))
            }
            return res.status(200).json({
                status: 200,
                message: 'Đăng ký thành công',
                data: null
            });

        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    };
    //change pass
    static async changePassword(req, res, next) {
        try {
            //kiểm tra old pass và new pass
            console.log(req.body)
            const account = await AccountService.getFullAccountInfoById(req.userId);
            if (!account) {
                return next(createError.InternalServerError("lỗi hệ thống, yêu cầu đăng nhập lại"));
            }
            const checkOldPassword = await comparePasswords(req.body.oldPassword, account.password)
            if (!checkOldPassword) {
                return next(createError.BadRequest('Mật khẩu cũ không đúng'));
            }
            const newPass = await hashPassword(req.body.newPassword);
            const newAccount = await AccountService.updateAccount(account.id, { password: newPass })
            if (!newAccount) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    //reset pass
    static async resetPassword(req, res, next) {
        try {
            //kiểm tra old pass và new pass
            const account = await AccountService.getAccountByEmail(req.body.email);
            if (!account) {
                return next(createError.InternalServerError("email chưa được đăng ký"));
            }
            const OTPCode =  generateRandomStringnumber(6);
            const newAccount = await AccountService.updateAccount(account.accountId, { OTP: OTPCode })
            if (!newAccount) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: OTPCode
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }

}
module.exports = SigController;