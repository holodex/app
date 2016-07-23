const { html } = require('inu')
const { navigate } = require('inux')

const Account = require('dex/accounts/app')
const Profiles = require('dex/profiles/app')

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
            ${Profiles.views.profile(model.account, model, dispatch)}
          </main>
        `
      }]
    ]
  }
}
