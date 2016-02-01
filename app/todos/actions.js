const { createActions } = require('feathers-action')

const client = require('api/client')

const { Todos } = require('./models')

module.exports = createActions(client, Todos)
