'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require("../db.connection");

class Request extends Model {}


Request.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  code: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  summary: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  done: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "employees",
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }

}, {
  sequelize,
  modelName: 'Request',
  tableName: 'requests',
  timestamps: false,
  underscored: true,
});


module.exports = Request