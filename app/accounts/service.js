const Auth = require('township-auth')
const basicAuth = require('township-auth/basic')

const service = {
  name: 'accounts',
  manifest: {
    create: 'async',
    verify: 'async'
  },
  init: function (server, config) {
    const auth = Auth(config.db, {
      providers: { basic: basicAuth }
    })

    return {
      create,
      verify
    }

    function create (provider, body, cb) {
      auth.findOne(provider, body, function (err, data) {
        if (err) return cb(err)
        if (data) return cb(new Error('Account already created.'))
        auth.create({ basic: body }, cb)
      })
    }

    function verify (provider, body, cb) {
      auth.verify(provider, body, cb)
    }
  }
}

module.exports = service
