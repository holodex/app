const { html } = require('inu')

const account = require('dex/accounts/views/account')
const profile = require('dex/profiles/views/profile')
const relationships = require('dex/relationships/views/relationships')

module.exports = viewAgent

function viewAgent (agentId, model, dispatch) {
  return html`
    <article>
      ${account(agentId, model, dispatch)}
      ${profile(agentId, model, dispatch)}
      ${relationships(agentId, model, dispatch)}
    </article>
  `
}
