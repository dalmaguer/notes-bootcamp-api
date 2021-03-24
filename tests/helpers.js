const supertest = require('supertest')
const { app } = require('../index')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/User')

// Notes
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

// Users
const initialUsers = async () => {
  const passwordHashed = await bcrypt.hash('12345678', 10)
  return [{
    username: 'testinguser',
    name: 'User for Testing',
    passwordHashed
  }]
}

const getAllUsers = async () => {
  const usersInDB = await User.find({})
  return usersInDB.map(user => user.toJSON())
}

module.exports = {
  api,
  getAllNotesFromApi,
  getAllUsers,
  initialNotes,
  initialUsers
}
