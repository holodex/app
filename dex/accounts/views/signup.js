const { html } = require('inu')
const getFormData = require('get-form-data')

const { run } = require('dex/run')

const { signup } = require('../effects')

module.exports = viewSignup

function viewSignup (model, dispatch) {
  return html`
    <form onsubmit=${handleSignup}>
      <fieldset>
        <label>email</label>
        <input name='email' type='email' autofocus />
      </fieldset>
      <fieldset>
        <label>password</label>
        <input name='password' type='password' />
      </fieldset>
      <input type='submit' value='signup' />
    </form>
  `

  function handleSignup (ev) {
    ev.preventDefault()
    const credentials = getFormData(ev.target)
    dispatch(run(signup(credentials)))
  }
}
