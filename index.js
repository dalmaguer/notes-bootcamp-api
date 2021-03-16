const getNextId = require('./utils/index')
const express = require('express')

const app = express()
app.use(express.json())

let notes = [{
  id: 1,
  content: 'HTML is easy',
  date: '2019-05-30T17:30:31.098Z',
  important: true
}, {
  id: 2,
  content: 'Browser can execute only javascript',
  date: '2019-05-30T17:39:34.091Z',
  important: false
}, {
  id: 3,
  content: 'React is Awesome',
  date: '2019-05-30T17:39:34.091Z',
  important: true
}]

// ---------- With Node --------------------
// const http = require('http')

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

// ----------- With Express ----------------

app.get('/',(request, response) => {
  response.send('<h1>My Notes API 🚀</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const {id} = request.params
  const note = notes.find(n => n.id === Number(id))

  note
  ? response.json(note)
  : response.status(404).end()
})

app.delete('/api/notes/:id', (request, response) => {
  const {id} = request.params
  notes = notes.filter(item => item.id !== Number(id))
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if(!note || !note.content){
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const newNote = {
    id: getNextId(notes),
    content: note.content,
    date: new Date().toISOString(),
    important: note.important || false
  }
  notes = [...notes, newNote]
  response.status(201).json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})