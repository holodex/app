const extend = require('xtend')
const Model = require('level-model')
const toPull = require('stream-to-pull-stream')

const schema = require('./schema')

const service = {
  name: 'relationshipTypes',
  manifest: {
    put: 'async',
    find: 'source'
  },
  init: function (server, config) {
    const relationshipTypes = Model(
      config.db,
      extend(schema, {
        modelName: 'relationshipType',
        indexKeys: ['agentId']
      })
    )

    return {
      put,
      find
    }

    function put (profile, cb) {
      relationshipTypes.put(profile, cb)
    }

    function find (index, value) {
      return toPull.source(relationshipTypes.find(index, value))
    }
  }
}

module.exports = service
