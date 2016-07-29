const { html } = require('inu')
const { navigate } = require('inux')

const agent = require('dex/agents/views/agent')
const account = require('dex/accounts/views/account')
const logout = require('dex/user/views/logout')

module.exports = Dashboard

function Dashboard ({ api }) {
  return {
    routes: [
      ['dashboard', (params, model, dispatch) => {
        if (!model.user) {
          process.nextTick(() => {
            dispatch(navigate('/'))
          })
        }

        return html`
          <main>
            ${logout(model, dispatch)}
            ${account(model.user, model, dispatch)}
            ${agent(model.user, model, dispatch)}
          </main>
        `
      }]
    ]
  }
}
