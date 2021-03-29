const ERRORS_HANDLER = {
  CastError: (res) => res.status(400).send({
    error: 'param id is malformed'
  }),
  ValidationError: (res, error) => res.status(400).send({
    error: error.message
  }),
  JsonWebTokenError: (res) => res.status(401).json({
    error: 'token missing or invalid'
  }),
  TokenExpirerError: (res) => res.status(401).json({
    error: 'token expired'
  }),
  defaultError: res => res.status(500).end()
}

module.exports = (error, request, response, next) => {
  console.error(error.name)

  const handler = ERRORS_HANDLER[error.name] || ERRORS_HANDLER.defaultError
  handler(response, error)
}
