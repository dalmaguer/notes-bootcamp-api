const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI

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
