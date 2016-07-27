const { join } = require('path')

const config = {
  port: 5000,
  url: 'ws://localhost:5000',
  dbPath: join(__dirname, 'db')
}

module.exports = config
