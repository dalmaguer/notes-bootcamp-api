// test de integración
const mongoose = require('mongoose')

const { server } = require('../index')
const Note = require('../models/Note')
const { api, getAllNotesFromApi, initialNotes } = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({})

  const note1 = new Note(initialNotes[0])
  note1.save()

  const note2 = new Note(initialNotes[1])
  note2.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const { response } = await getAllNotesFromApi()
  expect(response).toHaveLength(initialNotes.length)
})

test('find content of: First Note', async () => {
  const { contents } = await getAllNotesFromApi()
  expect(contents).toContain('First Note')
})

test('create a new note', async () => {
  const newNote = {
    content: 'Nueva Nota'
  }
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const { contents, response } = await getAllNotesFromApi()
  expect(response).toHaveLength(initialNotes.length + 1)
  expect(contents).toContain(newNote.content)
})

test('insert new note without content must fail', async () => {
  const newNote = {}
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const { response } = await getAllNotesFromApi()
  expect(response).toHaveLength(initialNotes.length)
})

test('a note can be deleted', async () => {
  const { response: notesBeforeDelete } = await getAllNotesFromApi()
  const noteToDelete = notesBeforeDelete[0]
  await api.delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const { response: notesAfterDelete, contents } = await getAllNotesFromApi()
  expect(notesAfterDelete).toHaveLength(initialNotes.length - 1)
  expect(contents).not.toContain(noteToDelete.content)
})

test('a note that not exists can not be deleted', async () => {
  await api.delete('/api/notes/45654')
    .expect(400)

  const { response: notesAfterDelete } = await getAllNotesFromApi()

  expect(notesAfterDelete).toHaveLength(initialNotes.length)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
