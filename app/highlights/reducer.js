const { createReducer } = require('feathers-action')

const { Highlights } = require('./models')

module.exports = createReducer(Highlights)
