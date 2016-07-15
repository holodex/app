const { html } = require('inu')

const login = require('./login')
const logout = require('./logout')
const signup = require('./signup')

module.exports = viewAccount

function viewAccount (model, dispatch) {
  return html`
    <div class='account'>${
      model != null
        ? html`
          <div>
            hello ${model}!
            ${logout(model, dispatch)}
          </div>
        `
        : html`
          <div>
            ${signup(model, dispatch)}
            ${login(model, dispatch)}
          </div>
        `
    }</div>
  `
}
