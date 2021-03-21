const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

console.log(NODE_ENV)

const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => {
    console.log('Database connected')
  })
  .catch(err => {
    console.log(err)
  })

process.on('uncaughtException', () => {
  mongoose.connection.close()
})
