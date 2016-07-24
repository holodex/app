const { html } = require('inu')

const logout = require('./logout')

module.exports = viewAccount

function viewAccount (agent, model, dispatch) {
  return html`
    <div class='account'>
      <header>
        <h1>hello ${agent}</h1>
      </header>
      ${logout(model, dispatch)}
    </div>
  `
}
