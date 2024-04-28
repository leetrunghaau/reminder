const { DataTypes } = require('sequelize');
const db = require('../config/Database');


const Account = db.define('Account', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    fullName: {
        type: DataTypes.STRING(100),
        field: 'full_name',
        
    },
    email: {
        type: DataTypes.STRING(45),
        field: "email",
        
    },
    userName: {
        type: DataTypes.STRING(100),
        field: "user_name",
        
    },
    password: {
        type: DataTypes.TEXT,
        field: "password",
        
    },
    OTP:{
        type: DataTypes.STRING(20),
        field:"otp"
    }

}, {
    tableName: 'account',
    timestamps: false
});

module.exports = Account;
