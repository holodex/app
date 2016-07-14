const inu = require('inu')
const defer = require('pull-defer')
const pull = inu.pull
const getFormData = require('get-form-data')

module.exports = Account

function Account ({ api }) {
  return {
    init: () => ({
      model: null,
      effect: { type: 'getUser' }
    }),
    update: (model, action) => {
      switch (action.type) {
        case 'setUser':
          return { model: action.key }
      }
      return { model }
    },
    view: (model, dispatch) => {
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
            <input type='submit' onclick=${handleAuth('signup')} value='signup' />
            <input type='submit' onclick=${handleAuth('login')} value='login' />
          </form>
        </div>
      `

      function handleAuth (type) {
        return (ev) => {
          ev.preventDefault()
          const credentials = getFormData(ev.target.parentElement)
          const effect = { type, credentials }
          dispatch({ type: 'do', effect })
        }
      }

      function logout () {
        dispatch({ type: 'do', effect: { type: 'logout' } })
      }
    },
    run: (effect, sources) => {
      console.log('effect', effect)
      const deferred = defer.source()

      switch (effect.type) {
        case 'getUser':
          const user = JSON.parse(localStorage.getItem('holodex-user'))
          if (!user) return
          return pull.values([
            { type: 'setUser', key: user }
          ])
        case 'setUser':
          localStorage.setItem('holodex-user', JSON.stringify(effect.key))
          return pull.values([
            { type: 'setUser', key: effect.key }
          ])

        case 'logout':
          return pull.values([
            { type: 'do', effect: { type: 'setUser', key: null  } }
          ])
        case 'signup':
          api.accounts.create('basic', effect.credentials, onAuth)
          break;
        case 'login':
          api.accounts.verify('basic', effect.credentials, onAuth)
          break;
      }

      function onAuth (err, account) {
        if (err) {
          console.error(err)
          return
        }
        deferred.resolve(pull.values([
          { type: 'do', effect: { type: 'setUser', key: account.key } }
        ]))
      }

      return deferred
    }
  }
}
