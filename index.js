const http = require('http')

const notes = [{
  id: 1,
  content: 'HTML is easy',
  date: '2019-05-30T17:30:31.098Z',
  important: true
}, {
  id: 2,
  content: 'Browser can execute only javascript',
  date: '2019-05-30T17:39:34.091Z',
  important: false
}]

const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain'})
    response.end('Hello World!')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
