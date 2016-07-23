const { html } = require('inu')
const { navigate } = require('inux')
const css = require('sheetify')

const signup = require('dex/accounts/views/signup')

module.exports = viewLanding

const prefix = css`
  .toolbar {
    width: 100%;
    padding-top: 10px;
  }

  .toolbar .login {
    float: right;
  }
`

function viewLanding (model, dispatch) {
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
          ${signup(model.account, dispatch)}
        </section>
      </div>
    </main>
  `

  function handleLogin (ev) {
    dispatch(navigate('login'))
  }
}

