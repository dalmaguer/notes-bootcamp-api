require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/Note')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const path = require('path')

const PUBLIC_FOLDER = path.join(__dirname, 'public')

app.use(cors())
app.use(express.json())

// let notes = []

// ---------- With Node --------------------

// const http = require('http')

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

// ----------- With Express ----------------

app.get('/', (request, response) => {
  response.sendFile(PUBLIC_FOLDER + '/index.html')
})

// Servir estaticos de una carpeta
app.use('/images', express.static('images'))

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  // const note = notes.find(n => n.id === Number(id))
  Note.findById(id)
    .then(note => {
      note
        ? response.json(note)
        : response.status(404).end()
    })
    .catch(err => next(err))
})

app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  // notes = notes.filter(item => item.id !== Number(id))
  Note.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(err => next(err))
})

app.post('/api/notes', (request, response, next) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: note.important || false
  })

  newNote.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(err => next(err))
})

app.put('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important || false
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      response.json(result)
    })
    .catch(err => next(err))
})

// ----- middlewares -------------
app.use(notFound)
app.use(handleErrors)
// ------ end midlewares -------------

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
