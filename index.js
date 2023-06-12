const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/login', db.loginUser)
app.post('/createUser', db.createUser)
app.put('/updateUser/:id', db.updateUser)
app.delete('/deleteUser/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})