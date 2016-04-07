const { createReducer } = require('feathers-action')

const { Profiles } = require('./models')

module.exports = createReducer(Profiles)
