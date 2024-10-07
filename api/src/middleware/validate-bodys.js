const { AppError } = require("../handler/handlers")
const { errorStatusCodesMap, errorResponsesMap } = require("../handler/responses-map")


// verifica que la propiedad sea un string y no este vacio
const validateString = (string, field, maxlength = null) => {
  if (!string || typeof string !== "string" || string.trim() == "") {
    throw new AppError(errorStatusCodesMap.badRequest, `${field} ${errorResponsesMap.mustBeString}`);
  }
  // si debe validar un maximo length
  if (maxlength) {
    if (maxlength < string?.length) {
      throw new AppError(errorStatusCodesMap.badRequest, `${field} ${errorResponsesMap.stringLength} ${maxlength}`);
    }
  }
}

// valida una propiedad que puede o no estar y valida su length 
const validateStringEmpty = (string, field, maxlength = null) => {
  if (typeof string == "string") {
    // throw new AppError(errorStatusCodesMap.badRequest, `${field} ${errorResponsesMap.mustBeString}`);
    if (maxlength) {
      if (maxlength < string?.length) {
        throw new AppError(errorStatusCodesMap.badRequest, `${field} ${errorResponsesMap.stringLength} ${maxlength}`);
      }
    }
  }
}

// verifica que la propiedad sea un numero
const validateNumber = (num, field) => {
  if (isNaN(num) || num <= 0) {
    throw new AppError(errorStatusCodesMap.badRequest, ` ${field} ${errorResponsesMap.mustBeNumber}`);
  }
}

// valida el formato de una fecha
const validateDate = (dateStr, field) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) {
    throw new AppError(errorStatusCodesMap.badRequest, ` ${field} ${errorResponsesMap.mustBeDate}`);
  }
}

// valida un booleano
const validateBoolean = (bool, field) => {
  if (typeof bool !== "boolean") {
    throw new AppError(errorStatusCodesMap.badRequest, ` ${field} ${errorResponsesMap.mustBeBoolean}`);
  }
}

// valida el body
const validateBody = (body, validations) => {
  validations.forEach(({ field, validator, maxLength }) => {
    validator(body[field], field, maxLength)
  });
}

module.exports = {
  validateStringEmpty,
  validateString,
  validateNumber,
  validateDate,
  validateBody,
  validateBoolean
}