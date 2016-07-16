const { html, pull } = require('inu')
const { create, handleActions, handleEffects } = require('inux')
const defer = require('pull-defer')
const getFormData = require('get-form-data')

const { run } = require('dex/run')

const { account } = require('./views')
const { SET, set } = require('./actions')
const { PERSIST, RESTORE, LOGIN, LOGOUT, SIGNUP, restore, persist } = require('./effects')

module.exports = Account

function Account ({ api }) {
  return {
    init: () => ({
      model: null,
      effect: restore()
    }),
    update: handleActions({
      [SET]: (model, user) => ({ model: user })
    }),
    routes: [
      ['account', (params, model, dispatch) => {
        return html`
          <main>
            <nav></nav>
            <article></article>
            <div class='account'>
              ${account(model.account, dispatch)}
            </div>
          </main>
        `
      }],
    ],
    run: handleEffects({
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
        const deferred = defer.source()
        api.accounts.verify('basic', credentials, (err, account) => {
          if (err) return console.error(err)
          deferred.resolve(pull.values([run(persist(account.key))]))
        })
        return deferred
      },
      [SIGNUP]: (credentials) => {
        const deferred = defer.source()
        api.accounts.create('basic', credentials, (err, account) => {
          if (err) return console.error(err)
          deferred.resolve(pull.values([run(persist(account.key))]))
        })
        return deferred
      }
    })
  }
}
