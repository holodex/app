const extend = require('xtend')
const Model = require('level-model')
const toPull = require('stream-to-pull-stream')

const schema = require('./schema')

const service = {
  name: 'relationships',
  manifest: {
    put: 'async',
    del: 'async',
    find: 'source'
  },
  methods: function (server, config) {
    const relationships = Model(
      config.db,
      extend(schema, {
        modelName: 'relationship',
        indexKeys: ['type', 'source', 'target']
      })
    )

    return {
      put,
      del,
      find
    }

    function put (relationship, cb) {
      relationships.put(relationship, cb)
    }

    function del (key, cb) {
      relationships.del(key, cb)
    }

    function find (index, value) {
      return toPull.source(relationships.find(index, value))
    }
  }
}

module.exports = service
