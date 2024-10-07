require("dotenv").config();

module.exports = {
  "development": {
    "username": "postgres",
    "password": "12345",
    "database": "prueba_konecta",
    "host": process.env.DB_HOST,
    "port": "5432",
    "dialect": "postgres",
    "seederStorage": "sequelize"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}