const { Router } = require("express");

// responses
const { responseOk, responseError } = require("../handler/responses-func");
const { Employee, Sequelize, sequelize, Request } = require("../sequelize/models");
const { AppError, handlerError, handlerCreateError } = require("../handler/handlers");
const { errorStatusCodesMap, errorResponsesMap } = require("../handler/responses-map");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyToken, verifyEmployee } = require("../middleware/auth-middlware");
const { validateBody, validateString, validateStringEmpty } = require("../middleware/validate-bodys");


const router = Router();

// obtiene un registro por id
router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const request = await Request.findByPk(id);
    responseOk(res, request);
  } catch (error) {
    console.log(error);
    responseError(res);
  }
});

// elimina el registro por id
router.delete("/:id", verifyToken, verifyEmployee, async (req, res) => {
  const { id } = req.params;
  const employeeId = req.user.id;
  try {
    const request = await Request.findByPk(id);

    // si el que intenta editar no es el dueño del pedido, no lo va a dejar
    if (employeeId != request.employee_id) {
      throw new AppError(errorStatusCodesMap.unauthorized, errorResponsesMap.unauthorized)
    }

    await request.destroy();

    responseOk(res);
  } catch (error) {
    console.log(error);
    handlerError(res, error)
  }
});

// para marcar una solicitud como solucionada
router.put("/close/:id", verifyToken, verifyEmployee, async (req, res) => {
  const { id } = req.params;
  const employeeId = req.user.id;
  try {

    const request = await Request.findByPk(id);

    request.done = true;
    await request.save();

    // falta crear el registro
    responseOk(res);
  } catch (error) {
    console.log(error);
    handlerError(res, error)
  }
})

// para editar una solicitud 
router.put("/:id", verifyToken, verifyEmployee, async (req, res) => {

  try {

    validateBody(req.body, [
      { field: "code", validator: validateString },
      { field: "description", validator: validateString },
      { field: "summary", validator: validateStringEmpty, maxLength: 50 },

    ]);

    const { code, description, summary } = req.body;
    const { id } = req.params;
    const employeeId = req.user.id;
    const request = await Request.findByPk(id);

    // si el que intenta editar no es el dueño del pedido, no lo va a dejar
    if (employeeId != request.employee_id) {
      throw new AppError(errorStatusCodesMap.unauthorized, errorResponsesMap.unauthorized)
    }
    request.code = code;
    request.description = description;
    request.summary = summary;
    request.updated_at = new Date();
    await request.save();

    // falta crear el registro
    responseOk(res);
  } catch (error) {
    console.log(error);
    handlerError(res, error);
  }
});

// para crear una solicitud
router.post("/", verifyToken, verifyEmployee, async (req, res) => {

  try {

    validateBody(req.body, [
      { field: "code", validator: validateString, maxLength: 50 },
      { field: "description", validator: validateString, maxLength: 50 },
      { field: "summary", validator: validateStringEmpty, maxLength: 50 },
    ]);
    const { code, description, summary } = req.body;
    const employeeId = req.user.id;

    await Request.create({
      code,
      description,
      summary,
      employee_id: employeeId
    });

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

    const requests = await Request.findAll({
      limit: numOfItemsNumber,
      offset: page > 1 ? (page * numOfItemsNumber) - numOfItemsNumber : 0,
      include: [
        {
          model: Employee,
          attributes: ["name"]
        }
      ]
    });

    const mapData = requests.map((rq) => {
      const { Employee, ...rest } = rq.dataValues
      return {
        ...rest,
        employee: Employee.name
      }
    })

    const count = await Request.count();

    responseOk(res, { data: mapData, count });
    // responseOk(res, { data: requests, count: 12 });
  } catch (error) {
    console.log("Aqui esta el errro")
    // console.log(error);
    handlerError(res, error);
  }
})


module.exports = router;
