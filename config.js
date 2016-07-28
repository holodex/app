const { join } = require('path')

const config = {
  port: 5000,
  url: 'ws://localhost:5000',
  entry: join(__dirname, 'browser.js'),
  dbPath: join(__dirname, 'db'),
  staticPath: join(__dirname, 'dex')
}

module.exports = config
