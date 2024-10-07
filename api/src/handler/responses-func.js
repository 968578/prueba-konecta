// responses ok
const responseOk = (res, value = null) => {
  res.json({
    name: "ok",
    message: "ok",
    value,
  });
}

// responses error
const responseError = (res, name = "error", message = "error", statusCode = 500) => {
  res.status(statusCode).json({
    name,
    message,
    value: null
  })
}

module.exports = {
  responseOk,
  responseError
};