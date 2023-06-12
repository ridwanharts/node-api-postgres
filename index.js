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
app.get('/login', db.getLoginUser)
app.post('/createdUsers', db.createUser)
app.put('/updateUsers/:id', db.updateUser)
app.delete('/deleteUsers/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})