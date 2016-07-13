const service = {
  name: 'agents',
  version: '0.0.0',
  manifest: {
    whoami: 'async'
  },
  init: (server, config) => {
    return {
      whoami
    }

    function whoami (cb) {
      return cb(null, {
        id: 'you',
        name: 'You'
      })
    }
  }
}

module.exports = service
