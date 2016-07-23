const { html } = require('inu')
const { navigate } = require('inux')
const css = require('sheetify')

const Account = require('dex/accounts/app')

module.exports = Landing

const prefix = css`
  .toolbar {
    width: 100%;
    padding-top: 10px;
  }

  .toolbar .login {
    float: right;
  }
`

function Landing ({ api }) {
  return {
    routes: [
      ['', (params, model, dispatch) => {
        if (model.account) {
          process.nextTick(() => {
            dispatch(navigate('dashboard'))
          })
        }

        return html`
          <main class=${prefix}>
            <div class='toolbar'>
              <button class='login' onclick=${handleLogin}>login</button>
            </div>
            <div class='center'>
              <header>
                <h1>Holodex</h1>
                <h2>Connecting you and your networks</h2>
              </header>
              <section class='call-to-action'>
                ${Account.views.signup(model.account, dispatch)}
              </section>
            </div>
          </main>
        `

        function handleLogin (ev) {
          dispatch(navigate('login'))
        }
      }],
      ['login', (params, model, dispatch) => {
        if (model.account) {
          process.nextTick(() => {
            dispatch(navigate('dashboard'))
          })
        }

        return html`
          <main>
            ${Account.views.login(model.account, dispatch)}
          </main>
        `
      }]
    ]
  }
}
