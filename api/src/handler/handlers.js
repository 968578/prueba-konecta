const { responseError } = require("./responses-func");
const { errorStatusCodesMap, errorResponsesMap } = require("./responses-map");

// con esta instancia vamos a crear nuestros errores personalizados
class AppError extends Error {
  code;

  constructor(code = 500, message = "error") {
    super(message);
    this.code = code;
  }
}

// va a repartir los errorees entre los personalizados y los del sistema
const handlerError = (res, err) => {
  if (err instanceof AppError) {
    responseError(res, undefined, err.message, err.code)
  } else {
    responseError(res);
  }
}

// va repartir los errores cuando se crea un registro
const handlerCreateError = (res, err) => {
  const code = err?.parent?.code || null;
  const detail = err?.original?.detail || ""
  const startIndex = detail.indexOf("(");
  const endIndex = detail.indexOf(")");
  const field = detail.slice(startIndex + 1, endIndex);
  if (err?.parent?.code == "23505") {
    responseError(res, errorResponsesMap.conflict, `duplicate:${field}`, errorStatusCodesMap.conflic)
  } else {
    handlerError(res, err);
  }
}


module.exports = {
  AppError,
  handlerError,
  handlerCreateError
}
