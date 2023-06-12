const Pool = require('pg').Pool
const pool = new Pool({
  user: 'sbpghhbs',
  host: 'mahmud.db.elephantsql.com',
  database: 'sbpghhbs',
  password: 'z5yDjqnD4HZMFsJrjY9MD3xLhAFUXcYY',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getLoginUser = (request, response) => {
  const { username, password} = request.body

  pool.query('SELECT * FROM users WHERE username = $1', [username], (error, results) => {
    if (error) {
      throw error
    }
    const user = results.rows[0];
    if (!user) {
      // User not found
      response.status(404).json({ message: 'User not found' });
    } else {
      // Compare the provided password with the stored password
      if (providedPassword === user.password) {
        // Passwords match, authentication successful
        response.status(200).json({ message: 'Authentication successful' });
      } else {
        // Passwords don't match, authentication failed
        response.status(401).json({ message: 'Authentication failed' });
      }
    }

  })
}

const createUser = (request, response) => {
  const { username, email, password} = request.body
  var createdTime = Date.now();

  pool.query('INSERT INTO users (username, email, password, created_time) VALUES ($1, $2, $3, to_timestamp($4 / 1000.0))', [username, email, password, createdTime], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.oid}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, email } = request.body

  pool.query(
    'UPDATE api.users SET username = $1, email = $2 WHERE id = $3',
    [username, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  getLoginUser,
  createUser,
  updateUser,
  deleteUser,
}