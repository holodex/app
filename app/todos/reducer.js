const { createReducer } = require('feathers-action')

const { Todos } = require('./models')

module.exports = createReducer(Todos)
