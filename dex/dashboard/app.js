const { html } = require('inu')
const { navigate } = require('inux')

const agent = require('dex/agents/views/agent')

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
            ${agent(model.account, model, dispatch)}
          </main>
        `
      }]
    ]
  }
}
