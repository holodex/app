const inu = require('inu')
const defer = require('pull-defer')
const pull = inu.pull
const getFormData = require('get-form-data')

module.exports = Ui

function Ui ({ api }) {
  return {
    init: () => ({
      model: {
        user: null,
        agents: {}
      },
      effect: { type: 'getUser' }
    }),
    update: (model, action) => {
      var effect
      switch (action.type) {
        case 'do':
          effect = action.effect
        case 'setUser':
          model = Object.assign({}, model, {
            user: action.key
          })
          break
      }
      return { model, effect }
    },
    view: (model, dispatch) => {
      return inu.html`
        <main>
          <div>
            ${ model.user
              ? `hello ${model.user} !`
              : ''
            }
          </div>
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
        </main>
      `

      function handleAuth (type) {
        return (ev) => {
          ev.preventDefault()
          const credentials = getFormData(ev.target.parentElement)
          const effect = { type, credentials }
          dispatch({ type: 'do', effect })
        }
      }
    },
    run: (effect, sources) => {
      const deferred = defer.source()

      switch (effect.type) {
        case 'getUser':
          const user = localStorage.getItem('holodex-user')
          if (!user) return
          return pull.values([
            { type: 'setUser', key: user }
          ])
        case 'persistUser':
          localStorage.setItem('holodex-user', effect.key)
          return pull.values([
            { type: 'setUser', key: effect.key }
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
          { type: 'do', effect: { type: 'persistUser', key: account.key } }
        ]))
      }

      return deferred
    }
  }
}
