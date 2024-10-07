require("dotenv").config();

const express = require("express");
const sequelize = require("./sequelize/db.connection");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//controladores
const employeeController = require("./controller/employee-controller.js");
const requestController = require("./controller/request-controller.js");
const verifyConecction = require("./verify-db.js");

// rutas a controladores
// controla las operaciones para empleados
app.use("/api/v1/employee", employeeController);

// controla las operaciones para solicitudes
app.use("/api/v1/request", requestController);


const port = process.env.PORT || 3000;

// se inicia la app
if (require.main === module) {
  const startServer = async () => {
    // verifica que la base de datos este creada
    await verifyConecction();
    app.listen(port, async () => {
      console.log("Api en el puerto " + port);
      try {
        // se autentica la base de datos
        await sequelize.authenticate();
        console.log("Db autenticada");
      } catch (error) {
        console.log(error);
        console.log("Db no pudo autenticar");
      }
    });
  }
  startServer();
}


module.exports = app;