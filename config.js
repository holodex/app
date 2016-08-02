const { join } = require('path')

const config = {
  port: 5000,
  url: '//localhost:5000',
  entry: join(__dirname, 'browser.js'),
  dbPath: join(__dirname, 'db'),
  staticPath: join(__dirname, 'dex')
}

if (process.env.NODE_ENV === 'production') {
  config.port = process.env.PORT
  config.url = '//staging.holodex.is',
  config.letsencrypt = {
    path: join(__dirname, 'letsencrypt'),
    host: 'staging.holodex.is',
    email: 'michael.williams@enspiral.com',
    agreeTos: true
  }
}

module.exports = config
