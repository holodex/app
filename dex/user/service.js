const service = {
  name: 'user',
  manifest: {
    login: 'async',
    logout: 'async',
    signup: 'async',
    whoami: 'sync'
  },
  init: function (server, config) {
    const accounts = server.methods.accounts
    const tickets = config.tickets

    return {
      whoami,
      login,
      signup
    }

    function whoami () {
      return this.id
    }

    function login (body, cb) {
      accounts.verify(body, function (err, account) {
        if (err) return cb(err)
        tickets.create(account.key, function (err, ticket) {
          if (err) return cb(err)
          console.log('ticket', ticket)
          cb(null, ticket)
        })
      })
    }

    function signup (email, cb) {
      accounts.create(email, function (err, account) {
        if (err) return cb(err)
        tickets.create(account.key, function (err, ticket) {
          if (err) return cb(err)
          console.log('ticket', ticket)
          cb(null, ticket)
        })
      })
    }
  }
}

module.exports = service
