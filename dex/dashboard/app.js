const { html } = require('inu')
const Account = require('dex/accounts/app')
const { navigate } = require('inux')

module.exports = Dashboard

function Dashboard ({ api }) {
  return {
    routes: [
      ['dashboard', (params, model, dispatch) => {
        if (!model.account) {
          process.nextTick(() => {
            dispatch(navigate('/'))
          })
        }

        return html`
          <main>
            ${Account.views.account(model, dispatch)}
          </main>
        `
      }]
    ]
  }
}
