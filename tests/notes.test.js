// test de integración
const mongoose = require('mongoose')

const { server } = require('../index')
const Note = require('../models/Note')
const { api, getAllNotesFromApi, initialNotes } = require('./helpers')

describe('Notes', () => {
  beforeEach(async () => {
    await Note.deleteMany({})

    for (const note of initialNotes) {
      const noteObject = new Note(note)
      await noteObject.save()
    }
  })

  test('Notes from Api are returned in json format', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('There are two notes inserted by default', async () => {
    const { response } = await getAllNotesFromApi()
    expect(response).toHaveLength(initialNotes.length)
  })

  test('The first note from api have the right content', async () => {
    const { contents } = await getAllNotesFromApi()
    expect(contents).toContain('First Note')
  })

  test('A note can be created', async () => {
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

  test('Creating a note without a content must fail', async () => {
    const newNote = {}
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)

    const { response } = await getAllNotesFromApi()
    expect(response).toHaveLength(initialNotes.length)
  })

  test('A note can be deleted', async () => {
    const { response: notesBeforeDelete } = await getAllNotesFromApi()
    const noteToDelete = notesBeforeDelete[0]
    await api.delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const { response: notesAfterDelete, contents } = await getAllNotesFromApi()
    expect(notesAfterDelete).toHaveLength(initialNotes.length - 1)
    expect(contents).not.toContain(noteToDelete.content)
  })

  test('A note that does not exist cannot be deleted', async () => {
    await api.delete('/api/notes/45654')
      .expect(400)

    const { response: notesAfterDelete } = await getAllNotesFromApi()

    expect(notesAfterDelete).toHaveLength(initialNotes.length)
  })

  afterAll(() => {
    mongoose.disconnect()
    server.close()
  })
})
