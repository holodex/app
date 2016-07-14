const inu = require('inu')
const { create } = require('inux')
const defer = require('pull-defer')
const pull = inu.pull
const getFormData = require('get-form-data')

const { send } = require('app/send')

const GET = Symbol('get')
const SET = Symbol('set')

const LOGIN = Symbol('login')
const LOGOUT = Symbol('logout')
const SIGNUP = Symbol('signup')

const get = create(GET)
const set = create(SET)

const login = create(LOGIN)
const logout = create(LOGOUT)
const signup = create(SIGNUP)

module.exports = Account

function Account ({ api }) {
  return {
    init: () => ({
      model: null,
      effect: get()
    }),
    update: {
      [SET]: (model, user) => ({ model: user })
    },
    views: {
      account: (model, dispatch) => {
        return inu.html`
          <div class='account'>
            <div>
              ${ model != null
                ? `hello ${model} !`
                : ''
              }
            </div>
            <button onclick=${logout}>logout</button>
            <form onsubmit=${(ev) => ev.preventDefault()}>
              <fieldset>
                <label>email</label>
                <input name='email' type='email' autofocus />
              </fieldset>
              <fieldset>
                <label>password</label>
                <input name='password' type='password' />
              </fieldset>
              <input type='submit' onclick=${handleAuth(SIGNUP)} value='signup' />
              <input type='submit' onclick=${handleAuth(LOGIN)} value='login' />
            </form>
          </div>
        `

        function handleAuth (type) {
          return (ev) => {
            ev.preventDefault()
            const credentials = getFormData(ev.target.parentElement)
            const effect = { type, credentials }
            dispatch(send(effect))
          }
        }

        function logout () {
          dispatch(send(logout()))
        }
      }
    },
    run: {
      [GET]: () => {
        const user = JSON.parse(localStorage.getItem('holodex-user'))
        if (!user) return
        console.log('user', user)
        return pull.values([set(user)])
      },
      [SET]: (user) => {
        localStorage.setItem('holodex-user', JSON.stringify(user))
        return pull.values([set(user)])
      },
      [LOGOUT]: (effect) => {
        return pull.values([send(set(null))])
      },
      [LOGIN]: (effect) => {
        const deferred = defer.source()
        api.accounts.verify('basic', effect.credentials, (err, account) => {
          if (err) return console.error(err)
          deferred.resolve(pull.values([send(set(account.key))]))
        })
      },
      [SIGNUP]: (effect) => {
        const deferred = defer.source()
        api.accounts.create('basic', effect.credentials, (err, account) => {
          if (err) return console.error(err)
          deferred.resolve(pull.values([send(set(account.key))]))
        })
      }
    }
  }
}
