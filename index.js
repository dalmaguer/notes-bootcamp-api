require('dotenv').config()
require('./mongo')
// const {getNextId} = require('./utils/index')
const express = require('express')
const cors = require('cors')
const Note = require('./models/Note')

const app = express()
app.use(express.json())
app.use(cors())

let notes = []

// ---------- With Node --------------------
// const http = require('http')

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

// ----------- With Express ----------------

app.get('/',(request, response) => {
  response.sendFile(__dirname + '/index.html')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  const {id} = request.params
  //const note = notes.find(n => n.id === Number(id))
  Note.findById(id)
  .then(note => {
    note
  ? response.json(note)
  : response.status(404).end()
  })
  .catch(err => {
    console.log(err)
    // response.status(400).end()
    next(err)
  })
})

app.delete('/api/notes/:id', (request, response, next) => {
  const {id} = request.params
  // notes = notes.filter(item => item.id !== Number(id))
  Note.findByIdAndRemove(id)
  .then(res => {
    response.status(204).end()
  })
  .catch(err => {
    next(err)
  })
})

app.post('/api/notes', (request, response, next) => {
  const note = request.body

  if(!note || !note.content){
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
  .catch(err => {
    next(err)
  })
})

app.put('/api/notes/:id', (request, response, next) => {
  const {id}  = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important || false
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
  .then(result => {
    response.json(result)
  })
  .catch(err => {
    next(err)
  })
})

app.use((error, request, response, next) => {
  console.error(error)

  if(error.name === 'CastError'){
    response.status(400).send({
      error: 'param id is malformed'
    })
  } else {
    response.status(500).end()
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})