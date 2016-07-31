const { join } = require('path')

const config = {
  port: 5000,
  url: 'wss://localhost.holodex.is:5000',
  entry: join(__dirname, 'browser.js'),
  dbPath: join(__dirname, 'db'),
  staticPath: join(__dirname, 'dex'),
  letsencrypt: {
    path: join(__dirname, 'letsencrypt'),
    host: 'localhost.holodex.is',
    email: 'michael.williams@enspiral.com',
    agreeTos: true
  }
}

module.exports = config
