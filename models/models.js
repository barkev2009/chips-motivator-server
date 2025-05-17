const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Record = sequelize.define(
    'record',
    {
        id: { type: DataTypes.INTEGER, unique: true, primaryKey: true, allowNull: false, autoIncrement: true },
        device_id: { type: DataTypes.STRING, unique: true, allowNull: false },
        seconds: { type: DataTypes.INTEGER, allowNull: true },
    }
)

module.exports = {
    Record
};