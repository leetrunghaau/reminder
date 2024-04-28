const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const Account = require('./account-model');


const Lable = db.define('Lable', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    name: {
        type: DataTypes.STRING(100),
        field: 'name',
        
    },
    color: {
        type: DataTypes.STRING(45),
        field: "color",
        
    },
    accountId: {
        type: DataTypes.INTEGER,
        field: "account_id",
        
    }

}, {
    tableName: 'lable',
    timestamps: false
});
Lable.belongsTo(Account, { foreignKey: "accountId", onDelete: 'CASCADE', onUpdate: 'CASCADE' })
module.exports = Lable;
