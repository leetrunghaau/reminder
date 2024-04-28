const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const Reminder = require('./reminder-model');


const NotificationTime = db.define('NotificationTime', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    value: {
        type: DataTypes.INTEGER,
        field: 'value',
        
    },
    unit: {
        type: DataTypes.STRING(45),
        field: "unit",
        
    },
    realTime: {
        type: DataTypes.DATEONLY,
        field: "real_time",
        
    },
    reminderId: {
        type: DataTypes.INTEGER,
        field: "reminder_id",
        
    }
}, {
    tableName: 'notification_time',
    timestamps: false
});
NotificationTime.belongsTo(Reminder, { foreignKey: "reminderId", onDelete: 'CASCADE', onUpdate: 'CASCADE' })
module.exports = NotificationTime;
