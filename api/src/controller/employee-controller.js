const { Router } = require("express");

// responses
const { responseOk, responseError } = require("../handler/responses-func");
const { Employee, Sequelize, sequelize } = require("../sequelize/models");
const { AppError, handlerError, handlerCreateError } = require("../handler/handlers");
const { errorStatusCodesMap, errorResponsesMap } = require("../handler/responses-map");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyToken, verifyEmployee } = require("../middleware/auth-middlware");
const { validateBody, validateString, validateDate, validateNumber, validateBoolean, validateStringEmpty } = require("../middleware/validate-bodys");


const router = Router();

// obtiene un registro por id
router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id, {
      attributes: {
        exclude: ["password"]
      }
    });
    responseOk(res, employee);
  } catch (error) {
    console.log(error);
    responseError(res);
  }
});

// elimina el registro por id
router.delete("/:id", verifyToken, verifyEmployee, async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.destroy({
      where: {
        id
      }
    })
    responseOk(res);
  } catch (error) {
    console.log(error);
    responseError(res);
  }
});

// para editar un empleado 
router.put("/:id", verifyToken, verifyEmployee, async (req, res) => {
  try {
    // se valida el body
    validateBody(req.body, [
      { field: "name", validator: validateString, maxLength: 50 },
      { field: "entry_date", validator: validateDate },
      { field: "salary", validator: validateNumber },
      { field: "password1", validator: validateStringEmpty },
      { field: "is_admin", validator: validateBoolean },
    ])
    const { name, entry_date, salary, password1, is_admin } = req.body;

    const { id } = req.params;

    const employee = await Employee.findByPk(id);

    let hash = employee.password;

    if (password1) {
      const salt = bcrypt.genSaltSync(11);
      hash = bcrypt.hashSync(password1, salt);
    }

    employee.name = name;
    employee.entry_date = entry_date;
    employee.salary = salary;
    employee.password = hash;
    employee.is_admin = is_admin;
    await employee.save();

    responseOk(res);

  } catch (error) {
    console.log(error);
    handlerCreateError(res, error);
  }
});

//para hacer el login
router.post("/login", async (req, res) => {

  try {
    // primero validamos el body 
    validateBody(req.body,
      [
        { field: "name", validator: validateString },
        { field: "password", validator: validateString },
      ]);

    const { name, password } = req.body;

    const employee = await Employee.findOne({
      where: {
        name
      }
    });

    if (!employee) {
      throw new AppError(errorStatusCodesMap.notFound, errorResponsesMap.notFoundEmployee);
    } else {

      let confirmPassword = bcrypt.compareSync(password, employee.password);
      if (confirmPassword) {

        const token = jwt.sign({ employee: employee.name, id: employee.id }, process.env.SECRET_JWT, { expiresIn: "5m" })
        const data = {
          id: employee.id,
          name: employee.name,
          access_token: token
        }
        return responseOk(res, data);
      } else {
        throw new AppError(errorStatusCodesMap.unauthorized, errorResponsesMap.incorrentPass);
      }
    }
  } catch (error) {
    console.log(error);
    handlerError(res, error)
  }
});

// para crear un empleado 
router.post("/", verifyToken, verifyEmployee, async (req, res) => {

  try {
    // se valida el body
    validateBody(req.body, [
      { field: "name", validator: validateString, maxLength: 50 },
      { field: "entry_date", validator: validateDate },
      { field: "salary", validator: validateNumber },
      { field: "password1", validator: validateString },
      { field: "is_admin", validator: validateBoolean },
    ])
    const { name, entry_date, salary, password1, is_admin } = req.body;

    // creamos el hash de la contraseña
    const salt = bcrypt.genSaltSync(11);
    const hash = bcrypt.hashSync(password1, salt);

    await Employee.create({
      name,
      entry_date,
      salary,
      password: hash,
      is_admin
    });

    // falta crear el registro
    responseOk(res);
  } catch (error) {
    console.log(error);
    handlerCreateError(res, error);
  }
});

// obtiene los datos con paginación
router.get("/:page/:numItems", verifyToken, async (req, res) => {
  const { page, numItems } = req.params;
  const numOfItemsNumber = Number(numItems);

  try {

    const employess = await Employee.findAll({
      limit: numOfItemsNumber,
      offset: page > 1 ? (page * numOfItemsNumber) - numOfItemsNumber : 0,
      attributes: {
        // omito la password para no enviarla al front
        exclude: ["password"]
      }
    });

    const count = await Employee.count();

    responseOk(res, { data: employess, count });
  } catch (error) {
    handlerError(res, error);
  }
});


module.exports = router;
