const { html } = require('inu')

const logout = require('./logout')

module.exports = viewAccount

function viewAccount (agentId, model, dispatch) {
  return html`
    <div class='account'>
      <header>
        <h1>hello ${agentId}</h1>
      </header>
      ${logout(model, dispatch)}
    </div>
  `
}
