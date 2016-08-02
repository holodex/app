const { html } = require('inu')

const profile = require('dex/profiles/views/profile')
const relationshipTypes = require('dex/relationshipTypes/views/list')
const relationships = require('dex/relationships/views/list')

module.exports = viewAgent

function viewAgent (agent, model, dispatch) {
  if (!agent) return null

  return html`
    <article>
      ${profile(agent, model, dispatch)}
      ${relationshipTypes(agent, model, dispatch)}
      ${relationships(agent, model, dispatch)}
    </article>
  `
}
