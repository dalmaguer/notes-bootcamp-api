const supertest = require('supertest')
const { app } = require('../index')
const api = supertest(app)

const initialNotes = [{
  content: 'First Note',
  importnat: true,
  date: new Date()
}, {
  content: 'Second Note',
  importnat: false,
  date: new Date()
}]

const getAllNotesFromApi = async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.map(item => item.content)
  return { response: response.body, contents }
}

module.exports = {
  api,
  getAllNotesFromApi,
  initialNotes
}
