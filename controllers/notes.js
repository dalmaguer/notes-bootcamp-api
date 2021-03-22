const notesRouter = require('express').Router()
const Note = require('../models/Note')

notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

notesRouter.get('/:id', (request, response, next) => {
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

notesRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params
  // notes = notes.filter(item => item.id !== Number(id))
  Note.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(err => next(err))
})

notesRouter.post('/', (request, response, next) => {
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

notesRouter.put('/:id', (request, response, next) => {
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

module.exports = notesRouter
