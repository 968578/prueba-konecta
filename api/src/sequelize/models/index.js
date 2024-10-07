const sequelize = require("../db.connection.js");
const Sequelize = require("sequelize");

// importamos lod modelos
const Employee = require("./Employee.js");
const Request = require("./Request.js");


// un empleado puede tener muchas solicitudes
Employee.hasMany(Request, { foreignKey: "employee_id", });
Request.belongsTo(Employee, { foreignKey: "employee_id" });



module.exports = {
  Employee,
  Request,
  Sequelize,
  sequelize
}
