const { html } = require('inu')
const { navigate } = require('inux')

const Account = require('dex/accounts/app')

module.exports = Landing

function Landing ({ api }) {
  return {
    routes: [
      ['/', (params, model, dispatch) => {
        if (model.account) {
          process.nextTick(() => {
            dispatch(navigate('dashboard'))
          })
        }

        return html`
          <main>
            <header>
              <h1>Holodex</h1>
              <h2>Connecting you and your networks</h2>
            </header>
            <section class='call-to-action'>
              ${Account.views.signup(model.account, dispatch)}
            </section>
          </main>
        `
      }]
    ]
  }
}
