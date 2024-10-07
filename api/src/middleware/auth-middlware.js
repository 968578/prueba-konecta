const { AppError, handlerError } = require("../handler/handlers");
const { responseError } = require("../handler/responses-func");
const { errorStatusCodesMap, errorResponsesMap } = require("../handler/responses-map");
const { Employee } = require("../sequelize/models/index.js")
const jwt = require("jsonwebtoken");


// verifica si es necesario que el usuario sea admin para hacer la operacion
const verifyPermissions = (method, url) => {
  let needAdmin = false
  if (
    // url es request y es put (editar) o post (crear) o delete (eliminar)
    url.includes("request") && ["POST", "PUT", "DELETE"].includes(method) &&

    // y no debe ser "/close" (marcar como resuelto)
    !url.includes("request/close")

  ) {
    needAdmin = false
  } else {
    // para el resto de operaciones es necesario ser admin
    needAdmin = true;
  }
  return needAdmin;
}

// verifica que el token sea valido.
const verifyToken = (req, res, next) => {

  try {
    const token = req?.headers?.["authorization"] || "";
    if (!token) {
      return responseError(res, undefined, errorResponsesMap.tokenMissing, errorStatusCodesMap.unauthorized)
    } else {

      jwt.verify(token, process.env.SECRET_JWT, async (err, data) => {
        if (err) {
          return responseError(res, undefined, errorResponsesMap.tokenInvalid, errorStatusCodesMap.unauthorized)
        } else {
          // si el token es valido obtengo los datos del usuario   
          const mustBeAdmin = verifyPermissions(req.method, req.originalUrl);
          req.user = {
            employee: data.employee,
            id: data.id,
            needAdmin: mustBeAdmin,
          }
          return next();
        }
      });
    }
  } catch (error) {
    console.log("error capturado")
    // console.log(error)
    console.log("error desde verify token")
    handlerError(res, error); 
  }

}

// verifica que el empleado si tenga el permiso necesario
const verifyEmployee = async (req, res, next) => {

  const { user } = req;

  try {
    const employee = await Employee.findByPk(user.id);
    // si el empleado necesita admin y no es admin que lance el error;
    if (user.needAdmin && !employee.is_admin) {
      throw new AppError(errorStatusCodesMap.unauthorized, errorResponsesMap.unauthorized);
    } else {
      return next();
    }

  } catch (error) {
    handlerError(res, error);
  }
}

module.exports = {
  verifyToken,
  verifyEmployee,
}