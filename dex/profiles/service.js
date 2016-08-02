const extend = require('xtend')
const Model = require('level-model')

const schema = require('./schema')

const service = {
  name: 'profiles',
  manifest: {
    put: 'async',
    findOne: 'async'
  },
  methods: function (server, config) {
    const profiles = Model(
      config.db,
      extend(schema, {
        modelName: 'profile',
        indexKeys: ['agent']
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
  },
  permissions: function (server, config) {
    return {
      put: function (profile) {
        return this.id === profile.agent
      },
      findOne: function (index, value) {
        return index === 'agent' && this.id === value
      }
    }
  }
}

module.exports = service
