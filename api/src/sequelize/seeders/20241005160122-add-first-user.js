'use strict';
const bcrypt = require('bcryptjs');
const { name, password } = require("../../../super-admin");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // si no encuentra los datos falla
    if (!name || !password) {
      throw new Error("Faltan datos primer usuario");
    } else {

      // creamos el hash de la contraseña
      const salt = bcrypt.genSaltSync(11);
      const hash = bcrypt.hashSync(password, salt);

      // agregamos el registro del usuario
      await queryInterface.bulkInsert("employees", [{
        id: 1,
        name,
        salary: 0,
        password: hash,
        is_admin: true
      }]);

      // Ajusta el valor de la secuencia
      await queryInterface.sequelize.query(`
          SELECT setval('employees_id_seq', (SELECT MAX(id) FROM employees));
        `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("employees", {
      id: 1
    });
  }
};
