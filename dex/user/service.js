const Route = require('http-routes')

const service = {
  name: 'user',
  manifest: {
    login: 'async',
    logout: 'async',
    signup: 'async',
    whoami: 'sync'
  },
  authenticate: function getId (server, config) {
    return (req, cb) => {
      config.tickets.check(req.headers.cookie, cb)
    }
  },
  methods: function (server, config) {
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
  },
  handlers: (server, config) => {
    return [
      // redeem a user ticket at /login/<ticket>
      Route([
        ['login/:ticket', function (req, res, next) {
          config.tickets.redeem(req.params.ticket, function (err, cookie) {
            if(err) return next(err)
            // ticket is redeemed! set it as a cookie, 
            res.setHeader('Set-Cookie', cookie)
            res.setHeader('Location', '/') // redirect to the login page.
            res.statusCode = 303
            res.end()
          })
        }],
        ['logout', function (req, res, next) {
          res.setHeader('Set-Cookie', 'cookie=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;')
          res.setHeader('Location', '/') // redirect to the login page.
          res.statusCode = 303
          res.end()
        }]
      ]),
      // return list of the current access rights. (for debugging)
      Route('whoami', function (req, res, next) {
        res.end(JSON.stringify(req.id) + '\n')
      })
    ]
  }
}

module.exports = service
