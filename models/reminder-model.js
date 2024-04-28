const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const Account = require('./account-model');
const Lable = require('./label-model');


const Reminder = db.define('Reminder', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    title: {
        type: DataTypes.STRING(100),
        field: "title",
        
    },
    duration: {
        type: DataTypes.DATE,
        field: 'duration',
        
    },
    note: {
        type: DataTypes.TEXT,
        field: "note"
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        field: "is_completed",
        
    },
    accountId: {
        type: DataTypes.INTEGER,
        field: "account_id",
        
    },
    labelId: {
        type: DataTypes.INTEGER,
        field: "label_id",
        
    }

}, {
    tableName: 'reminder',
    timestamps: false
});
Reminder.belongsTo(Account, { foreignKey: "accountId", onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Reminder.belongsTo(Lable, { foreignKey: "labelId", onDelete: 'CASCADE', onUpdate: 'CASCADE' })
module.exports = Reminder;