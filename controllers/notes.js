const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')
const userExtractor = require('../middleware/userExtractor')

notesRouter.get('/', (request, response) => {
  Note.find({}).populate('user', {
    username: 1,
    name: 1
  }).then(notes => {
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

notesRouter.delete('/:id', userExtractor, (request, response, next) => {
  const { id } = request.params
  // notes = notes.filter(item => item.id !== Number(id))
  Note.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(err => next(err))
})

notesRouter.post('/', userExtractor, async (request, response, next) => {
  const {
    content,
    important = false
  } = request.body

  const { userId } = request

  const user = await User.findById(userId)

  if (!content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const newNote = new Note({
    content,
    date: new Date(),
    important,
    user: user.id
  })

  // await newNote.save()
  //   .then(savedNote => {
  //     response.json(savedNote)
  //   })
  //   .catch(err => next(err))

  try {
    const savedNote = await newNote.save()

    // Guardar id de la nota agregada en las notas del usuario
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    // ------

    response.json(savedNote)
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/:id', userExtractor, (request, response, next) => {
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
