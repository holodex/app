const { html } = require('inu')

module.exports = viewAccount

function viewAccount (account, model, dispatch) {
  return html`
    <div class='account'>
      <h1>hello ${account.email}</h1>
    </div>
  `
}
