const extend = require('xtend')
const Model = require('level-model')
const cuid = require('cuid')
const bcrypt = require('bcrypt')

const schema = require('./schema.json')

const service = {
  name: 'accounts',
  manifest: {
    get: 'async',
    create: 'async',
    update: 'async',
    verify: 'async'
  },
  methods: function (server, config) {
    const accounts = Model(
      config.db,
      extend(schema, {
        modelName: 'account',
        indexKeys: ['email']
      })
    )

    return {
      get,
      create,
      update,
      verify
    }

    function get (key, cb) {
      accounts.get(key, cb)
    }

    function getByEmail (email, cb) {
      accounts.findOne('email', email, cb)
    }

    function create (email, cb) {
      const notFoundMessage = '[NotFoundError: model not found with email'
      accounts.findOne('email', email, function (err, data) {
        if (data) return cb(new Error('Account already created.'))
        if (err && !err.message.startsWith(notFoundMessage)) {
          return cb(err)
        }

        const key = cuid()
        accounts.create({ key, email }, cb)
      })
    }

    function update (body, cb) {
      const saltRounds = 10
      var nextAccount = {
        key: body.key,
        agent: body.agent
      }
      if (body.email) nextAccount.email = body.email
      if (body.password) {
        return bcrypt.hash(body.password, saltRounds, function (err, hash) {
          if (err) return cb(err)
          nextAccount.hash = hash
          accounts.update(nextAccount, cb)
        })
      }
      accounts.update(nextAccount, cb)
    }

    function verify (body, cb) {
      getByEmail(body.email, function (err, account) {
        if (err) return cb(err)

        if (!account.hash) {
          return cb(new Error('Login password not setup with account.'))
        }

        bcrypt.compare(body.password, account.hash, function (err, res) {
          if (err) return cb(err)
          if (!res) return cb(new Error('Invalid login credentials.'))
          cb(null, account)
        })
      })
    }
  }
}

module.exports = service
