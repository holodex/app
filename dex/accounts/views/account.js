const { html } = require('inu')

const logout = require('./logout')

module.exports = viewAccount

function viewAccount (model, dispatch) {
  return html`
    <div class='account' id=${model.account}>
      <header>
        <h1>hello ${model.account}</h1>
      </header>
      ${logout(model, dispatch)}
    </div>
  `
}
