const service = {
  name: 'agents',
  version: '0.0.0',
  manifest: {
    sync: 'sync',
    async: 'async',
    source: 'source'
  },
  methods: (server, config) => {
    return {
      sync: () => {
        return 'a'
      },
      async: (cb) => {
        cb(null, 'b')
      },
      source: () => {
        const pull = require('pull-stream')
        return pull.values(['c', 'd'])
      }
    }
  }
}

module.exports = service
