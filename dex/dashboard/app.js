const { html } = require('inu')
const { navigate } = require('inux')

const logout = require('dex/user/views/logout')
const agent = require('dex/agents/views/agent')
const account = require('dex/accounts/views/account')

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
            ${model.user && account(model.user, model, dispatch)}
            ${model.user && agent(model.user, model, dispatch)}
          </main>
        `
      }]
    ]
  }
}
