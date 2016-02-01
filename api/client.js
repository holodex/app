const feathers = require('feathers/client')
const primus = require('feathers-primus/client')
const Url = require('url')

const config = require('config')

const Primus = require('./primus')

const apiUrl = Url.format(config.api.url)

module.exports = feathers(apiUrl)
  .configure(primus(new Primus(apiUrl)))
