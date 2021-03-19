module.exports = (error, request, response, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    response.status(400).send({
      error: 'param id is malformed'
    })
  } else {
    response.status(500).end()
  }
}
