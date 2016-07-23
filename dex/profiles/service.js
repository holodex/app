const extend = require('xtend')
const Model = require('level-model')

const schema = require('./schema')

const service = {
  name: 'profiles',
  manifest: {
    put: 'async',
    findOne: 'async'
  },
  init: function (server, config) {
    const profiles = Model(
      config.db,
      extend(schema, {
        modelName: 'profile',
        indexKeys: ['agentId']
      })
    )

    return {
      put,
      findOne
    }

    function put (profile, cb) {
      profiles.put(profile, cb)
    }

    function findOne (index, value, cb) {
      profiles.findOne(index, value, cb)
    }
  }
}

module.exports = service
