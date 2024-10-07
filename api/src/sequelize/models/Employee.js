'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require("../db.connection");

class Employee extends Model {}


Employee.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },  
  entry_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  is_admin:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
}, {
  sequelize,
  modelName: 'Employee',
  tableName: 'employees',
  timestamps: false,
  underscored: true,
});


module.exports = Employee