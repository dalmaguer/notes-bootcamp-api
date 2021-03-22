// test de integración
const mongoose = require('mongoose')

const { server } = require('../index')
const User = require('../models/User')
const {
  api,
  initialUsers,
  getAllUsersFromApi
} = require('./helpers')

beforeEach(async () => {
  await User.deleteMany({})
  const initials = await initialUsers()
  for (const note of initials) {
    const userObject = new User(note)
    await userObject.save()
  }
})

describe('users', () => {
  test('can be created', async () => {
    const usersAtStart = await getAllUsersFromApi()

    const newUser = {
      username: 'danielita',
      name: 'Daniela Maria',
      password: '12345678'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getAllUsersFromApi()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creating a new user with an existing username must fail', async () => {
    const usersAtStart = await getAllUsersFromApi()

    const newUser = {
      username: 'testinguser',
      name: 'Testing user',
      password: '12345678'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.errors.username.message)
      .toContain('`username` to be unique')

    const usersAtEnd = await getAllUsersFromApi()
    expect(usersAtStart).toHaveLength(usersAtEnd.length)
  })
})

afterAll(() => {
  mongoose.disconnect()
  server.close()
})
