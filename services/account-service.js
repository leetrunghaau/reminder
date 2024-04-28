
const { generateKey } = require('crypto');
const Account = require('../models/account-model');
const { generateId, generateRandomString } = require('../helpers/generate-key');

class AccountService {
  static async getAccountById(id) {
    return Account.findByPk(id, { attributes: ["fullName", "email", "userName"] });
  }
  static async getFullAccountInfoById(id) {
    return Account.findByPk(id);
  }
  static async getAccountByUserName(userName) {
    return Account.findOne({ where: { userName: userName } });
  }
  static async getAccountByEmail(email) {
    return Account.findOne({ where: { email: email } });
  }
  static async getAllAccount() {
    return Account.findAll();
  }
  static async createAccount(accountData) {
    return Account.create(accountData);
  }

  static async updateAccount(id, accountData) {
    await Account.update(accountData, {
      where: { id: id },
    });
    return this.getAccountById(id);
  }
  static async deleteAccountById(id) {
    return Account.destroy({
      where: { id: id },
    });
  }
}

module.exports = AccountService;
