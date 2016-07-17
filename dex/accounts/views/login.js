const { html } = require('inu')
const { run } = require('inux')
const getFormData = require('get-form-data')

const { login } = require('../effects')

module.exports = viewLogin

function viewLogin (model, dispatch) {
  return html`
    <form onsubmit=${handleLogin}>
      <fieldset>
        <label>email</label>
        <input name='email' type='email' autofocus />
      </fieldset>
      <fieldset>
        <label>password</label>
        <input name='password' type='password' />
      </fieldset>
      <input type='submit' value='login' />
    </form>
  `

  function handleLogin (ev) {
    ev.preventDefault()
    const credentials = getFormData(ev.target)
    dispatch(run(login(credentials)))
  }
}
