
const { generateKey } = require('crypto');
const Lable = require('../models/label-model');
const { generateId, generateRandomString } = require('../helpers/generate-key');

class LableService {
  static async getLableById(id) {
    return Lable.findByPk(id);
  }
  static async getAllLable() {
    return Lable.findAll();
  }
  static async getAllLableByAccountId(accountId) {
    return Lable.findAll({ where: { accountId: accountId } });
  }
  static async createLable(lableData) {
    return Lable.create(lableData);
  }

  static async updateLable(id, lableData) {
    await Lable.update(lableData, {
      where: { id: id },
    });
    return this.getLableById(id);
  }

  static async deleteLableById(id) {
    return Lable.destroy({
      where: { id: id },
    });
  }
}

module.exports = LableService;
