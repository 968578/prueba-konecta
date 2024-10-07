require("dotenv").config();

const app = require("../index");
const request = require("supertest");

const { Employee, Request } = require("../sequelize/models/index");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const nameTest = "user-test-admin"
const passwordTest = "password-test"

let userTestAdmin = null;
let token = null;

beforeAll(async () => {

  const salt = bcrypt.genSaltSync(11);
  const hash = bcrypt.hashSync(passwordTest, salt);

  // se crea un usuario con el que nos vamos a autenticar
  userTestAdmin = await Employee.create({
    name: nameTest,
    entry_date: "2024-01-01",
    salary: 1000,
    password: hash,
    is_admin: true
  });

  // se crea un token ya que la api lo necesita 
  token = jwt.sign({ employee: userTestAdmin.name, id: userTestAdmin.id }, process.env.SECRET_JWT, { expiresIn: "5m" })
});

afterAll(async () => {

  // se elimina ese usuario despues de hacer las pruebas
  await Employee.destroy({
    where: {
      name: nameTest
    }
  })
});


describe("/api/v1/employee", () => {

  it("Debe retornar un token si el login es exitoso", async () => {
    const res = await request(app)
      .post("/api/v1/employee/login")
      .send({
        name: nameTest,
        password: passwordTest
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('ok');
    expect(res.body.value).toHaveProperty('access_token');
  });

  it('Debe retornar un error si falta la propiedad "name"', async () => {
    const res = await request(app)
      .post("/api/v1/employee/login")
      .send({
        password: passwordTest
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.name).toBe('error');
    expect(res.body.message).toBe('name must be string');
  });

  it('Debe retornar un error al intentar guardar un empleado sin token de session', async () => {
    const res = await request(app)
      .post("/api/v1/employee")
      .send({
        name: "user-1",
        entry_date: "2024-01-01",
        salary: 1000,
        password1: "12345",
        is_admin: false
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body.name).toBe('error');
    expect(res.body.message).toBe('token missing');
  });

  it('Guarda correctamente el empleado', async () => {
    const res = await request(app)
      .post("/api/v1/employee")
      .set("authorization", token)
      .send({
        name: "user-1",
        entry_date: "2024-01-01",
        salary: 2000,
        password1: "12345",
        is_admin: false
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('ok');
    expect(res.body.message).toBe('ok');
  });

  it('Obtiene un arreglo de empleados', async () => {
    const res = await request(app)
      .get("/api/v1/employee/1/10")
      .set("authorization", token)

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('ok');
    expect(res.body.message).toBe('ok');
    expect(res.body.value.data).toBeInstanceOf(Array);
    expect(res.body.value).toHaveProperty("count");

  });

  it('Edita correctamente el empleado', async () => {
    // obtengo el usuario guardado para usarlo en mas pruebas
    const employeeSaved = await Employee.findOne({
      where: {
        name: "user-1"
      }
    });
    const res = await request(app)
      .put("/api/v1/employee/" + employeeSaved.id)
      .set("authorization", token)
      .send({
        name: "user-1",
        entry_date: "2023-02-02",
        salary: 3000,
        password1: "98765",
        is_admin: true
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('ok');
    expect(res.body.message).toBe('ok');
  });

  it('Obtiene un empleado por id', async () => {
    // obtengo el usuario guardado para usarlo en mas pruebas
    const employeeSaved = await Employee.findOne({
      where: {
        name: "user-1"
      }
    });

    const res = await request(app)
      .get("/api/v1/employee/" + employeeSaved.id)
      .set("authorization", token);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('ok');
    expect(res.body.message).toBe('ok');
    expect(res.body.value.name).toBe('user-1');
  });

  it('Elimina un empleado por id', async () => {
    // obtengo el usuario guardado para usarlo en mas pruebas
    const employeeSaved = await Employee.findOne({
      where: {
        name: "user-1"
      }
    });

    const res = await request(app)
      .delete("/api/v1/employee/" + employeeSaved.id)
      .set("authorization", token);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('ok');
    expect(res.body.message).toBe('ok');
  });

})
