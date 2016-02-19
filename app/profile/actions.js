const { createActions } = require('feathers-action')

const client = require('api/client')

const { Profiles } = require('./models')

module.exports = createActions(client, Profiles)
    