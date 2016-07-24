const { html } = require('inu')

const account = require('dex/accounts/views/account')
const profile = require('dex/profiles/views/profile')
const relationships = require('dex/relationships/views/relationships')

module.exports = viewAgent

function viewAgent (agent, model, dispatch) {
  return html`
    <article>
      ${account(agent, model, dispatch)}
      ${profile(agent, model, dispatch)}
      ${relationships(agent, model, dispatch)}
    </article>
  `
}
