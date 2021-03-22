const { Schema, model } = require('mongoose')
const noteSchema = Schema({
  content: String,
  date: Date,
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = model('Note', noteSchema)

// Note.find({})
// .then(result => {
//   console.log(result)
//   mongoose.connection.close()
// })

// const note = new Note({
//   content: 'Hello MongoDB',
//   date: new Date(),
//   important: true
// })
// note.save()
// .then(result => {
//   console.log(result)
//   mongoose.connection.close()
// })
// .catch(err => {
//   console.log(err)
// })// Note.find({})
// .then(result => {
//   console.log(result)
//   mongoose.connection.close()
// })

module.exports = Note
