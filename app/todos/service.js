const service = require('api/service')

const { Todos } = require('./models')

module.exports = service(Todos)
