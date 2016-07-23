const { html, pull } = require('inu')
const { Domain, run } = require('inux')
const pullAsync = require('pull-async')
const getFormData = require('get-form-data')

const views = require('./views')
const { account } = views
const { SET, set } = require('./actions')
const { PERSIST, RESTORE, LOGIN, LOGOUT, SIGNUP, restore, persist } = require('./effects')

module.exports = Account
module.exports.views = views

function Account ({ api }) {
  return Domain({
    name: 'account',
    init: () => ({
      model: null,
      effect: restore()
    }),
    update: {
      [SET]: (model, user) => ({ model: user })
    },
    run: {
      [RESTORE]: () => {
        const user = JSON.parse(localStorage.getItem('holodex-user'))
        if (!user) return
        return pull.values([set(user)])
      },
      [PERSIST]: (user) => {
        localStorage.setItem('holodex-user', JSON.stringify(user))
        return pull.values([set(user)])
      },
      [LOGOUT]: () => {
        return pull.values([run(persist(null))])
      },
      [LOGIN]: (credentials) => {
        return pullAsync((cb) => {
          console.log('cb', cb)
          api.accounts.verify('basic', credentials, (err, account) => {
            if (err) return console.error(err)
            cb(null, run(persist(account.key)))
          })
        })
      },
      [SIGNUP]: (credentials) => {
        return pullAsync((cb) => {
          api.accounts.create('basic', credentials, (err, account) => {
            if (err) return console.error(err)
            cb(null, run(persist(account.key)))
          })
        })
      }
    }
  })
}
