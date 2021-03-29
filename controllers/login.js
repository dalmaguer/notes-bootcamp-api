const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  try {
    const user = await User.findOne({ username })
    const rightCredentials = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if (!rightCredentials) {
      response.status(401).json({
        error: 'Invalid username or password'
      })
    }

    const userData = {
      id: user._id,
      username: user.username
    }

    const token = jwt.sign(
      userData,
      process.env.SECRET,
      {
        expiresIn: 60 * 60 * 24 * 7
      }
    )

    response.send({
      name: user.name,
      username: user.username,
      token
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = loginRouter
