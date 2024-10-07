const errorResponsesMap = {
  notFoundEmployee: "not found employee",
  incorrentPass: "Inconrrect password",
  conflict: "conflict",
  tokenMissing: "token missing",
  tokenInvalid: "token invalid",
  unauthorized: "unauthorized",
  mustBeString: "must be string",
  mustBeNumber: "must be positive integer",
  mustBeDate: "must be date format yyyy-mm-dd",
  mustBeBoolean: "must be boolean",
  stringLength: "must be string less than",
}


const errorStatusCodesMap = {
  unauthorized: 401,
  notFound: 404,
  conflic: 409,
  badRequest: 400,

}


module.exports = {
  errorResponsesMap,
  errorStatusCodesMap
}