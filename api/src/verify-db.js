const { exec } = require("child_process");
const sequelize = require("./sequelize/db.connection");

// espera unos segundos
const sleep = () => {
  return new Promise((res) => setTimeout(res, 5000))
}

const runComand = (com, cwd) => {
  return new Promise((resolve, reject) => {
    exec(com, { cwd }, (err, stdout, stderr) => {
      if (err) {
        console.log("Error, " + stderr);
        return reject(err)
      }
      console.log(stdout);
      resolve();
    })
  })

}
// verifica la conexión con la base de datos
const verifyConecction = async () => {
  let counter = 0
  while (counter < 10) {
    await sleep();
    try {
      await sequelize.authenticate()
      await runComand("npx sequelize-cli db:migrate", './');
      await runComand("npx sequelize-cli db:seed:all", './')
      console.log("Online la DB");
      return
    } catch (error) {
      console.log("Sin levantar la DB");
      console.log(counter);
      console.log(error)
    }
    counter++
  }
  throw new Error(`No se pudo conectar a la base de datos después de ${counter} intentos`);
}

module.exports = verifyConecction;
