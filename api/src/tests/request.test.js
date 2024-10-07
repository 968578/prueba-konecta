require("dotenv").config();

const app = require("../index");
const request = require("supertest");

const { Employee, Request } = require("../sequelize/models/index-2");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const nameTest = "user-test-admin-2"
const passwordTest = "password-test-2"

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

describe("/api/v1/request", () => {

  it('Guarda correctamente la solicitud', async () => {
    const res = await request(app)
      .post("/api/v1/request")
      .set("authorization", token)
      .send({
        code:"3412-prueba123*",
        description: "Comprar equipos-prueba",
        summary:"Comprar equipos para el area"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('ok');
    expect(res.body.message).toBe('ok');
  });

  it('Obtiene un arreglo de solictudes', async () => {
    const res = await request(app)
      .get("/api/v1/request/1/10")
      .set("authorization", token)

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('ok');
    expect(res.body.message).toBe('ok');
    expect(res.body.value.data).toBeInstanceOf(Array);
    expect(res.body.value).toHaveProperty("count");

  });

  it('Edita correctamente la solictud correctamente', async () => {
    // obtengo el usuario guardado para usarlo en mas pruebas
    const requestSave = await Request.findOne({
      where: {
        code: "3412-prueba123*"
      }
    });
    const res = await request(app)
      .put("/api/v1/request/" + requestSave.id)
      .set("authorization", token)
      .send({
        code:"3412-prueba123*",
        description: "Comprar equipos-prueba Editado",
        summary:"Comprar equipos para el area Editado"
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('ok');
    expect(res.body.message).toBe('ok');
  });

  it('Obtiene una solicitud por id', async () => {
    // obtengo el usuario guardado para usarlo en mas pruebas
    const requestSave = await Request.findOne({
      where: {
        code: "3412-prueba123*"
      }
    });

    const res = await request(app)
      .get("/api/v1/request/" + requestSave.id)
      .set("authorization", token);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('ok');
    expect(res.body.message).toBe('ok');
    expect(res.body.value.code).toBe('3412-prueba123*');
  });

  it('Resuelve una solictud por id', async () => {
    // obtengo el usuario guardado para usarlo en mas pruebas
    const requestSave = await Request.findOne({
      where: {
        code: "3412-prueba123*"
      }
    });

    const res = await request(app)
      .put("/api/v1/request/close/" + requestSave.id)
      .set("authorization", token);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('ok');
    expect(res.body.message).toBe('ok');
  });

  it('Elimina una solictud por id', async () => {
    // obtengo el usuario guardado para usarlo en mas pruebas
    const requestSave = await Request.findOne({
      where: {
        code: "3412-prueba123*"
      }
    });

    const res = await request(app)
      .delete("/api/v1/request/" + requestSave.id)
      .set("authorization", token);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('ok');
    expect(res.body.message).toBe('ok');
  });

});

