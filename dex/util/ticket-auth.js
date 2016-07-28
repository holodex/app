const defined = require('defined')
const Tickets = require('ticket-auth')

module.exports = tokenAuth

function tokenAuth (auth, options) {
  options = defined(options, {})
  const secret = defined(options.secret, 'not a secret')

  return {
    // key must be named with pattern {providername}.{propertykey} for indexing
    key: 'token.token',
    create: function create (key, opts) {
      return {
        token: jwt.sign(key, secret)
      }
    },
    verify: function (opts, callback) {
      if (!opts) return new Error('provider credentials required')
      auth.db.get(opts.key, function (err, account) {
        if (err) return callback(err)
        var token = account.token
        jwt.verify(token, secret, function (err, key) {
          if (err) {
            console.error(err)
            return callback(new Error('Account not verified'))
          }
          callback(null, { key, token: { token }})
        })
      })
    }
  }
}
}

