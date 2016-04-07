const { createActions } = require('feathers-action')

const client = require('api/client')

const { Highlights } = require('./models')

module.exports = createActions(client, Highlights)
    