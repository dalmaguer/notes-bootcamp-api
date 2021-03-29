require('dotenv').config()
require('./mongo')

// const Sentry = require('@sentry/node')
// const Tracing = require('@sentry/tracing')

const express = require('express')
const app = express()
const cors = require('cors')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const path = require('path')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const loginRouter = require('./controllers/login')

const PUBLIC_FOLDER = path.join(__dirname, 'public')

app.use(cors())
app.use(express.json())

// ------------- Sentry --------------------
// Sentry.init({
//   dsn: '',
//   integrations: [
//     new Sentry.Integrations.Http({ tracing: true }),
//     new Tracing.Integrations.Express({ app })
//   ],
//   tracesSampleRate: 1.0
// })
//
// app.use(Sentry.Handlers.requestHandler())
// app.use(Sentry.Handlers.tracingHandler())

// let notes = []

//
// ---------- With Node --------------------
//
// const http = require('http')

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

//
// ----------- With Express ----------------
//
app.get('/', (request, response) => {
  response.sendFile(PUBLIC_FOLDER + '/index.html')
})

// Servir estaticos de una carpeta
app.use('/images', express.static('images'))

// Login Router
app.use('/api/login', loginRouter)

// Users Router
app.use('/api/users', usersRouter)

// Notes Router
app.use('/api/notes', notesRouter)

app.use(notFound)

// app.use(Sentry.Handlers.errorHandler())

app.use(handleErrors)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
