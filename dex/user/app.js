const { html, pull } = require('inu')
const { Domain, run } = require('inux')
const pullAsync = require('pull-async')

const { SET, set } = require('./actions')
const { set: setAccount } = require('dex/accounts/actions')
const { WHOAMI, LOGIN, LOGOUT, SIGNUP, whoami } = require('./effects')

module.exports = User

function User ({ api }) {
  return Domain({
    name: 'user',
    init: () => ({
      model: null,
      effect: whoami()
    }),
    update: {
      [SET]: (model, user) => ({ model: user })
    },
    run: {
      [WHOAMI]: () => {
        return pullAsync(cb => {
          api.user.whoami((err, id) => {
            if (err) return console.error(err)
            cb(null, set(id))
          })
        })
      },
      [LOGOUT]: () => {
        window.location = '/logout'
      },
      [LOGIN]: (credentials) => {
        return pullAsync((cb) => {
          api.user.login(credentials, (err, accountKey) => {
            if (err) return console.error(err)
            window.location = `/login/${accountKey}`
          })
        })
      },
      [SIGNUP]: (email) => {
        return pullAsync((cb) => {
          api.user.signup(email, (err, accountKey) => {
            if (err) return console.error(err)
            window.location = `/login/${accountKey}`
          })
        })
      }
    }
  })
}
