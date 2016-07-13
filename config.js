const { join } = require('path')

var config = {
  port: 5000,
  url: 'ws://localhost:5000',
  dbPath: join(__dirname, 'db')
}

if (!process.browser) {
  const level = require('level-party')
  config.db = level(config.dbPath)
}

module.exports = config
