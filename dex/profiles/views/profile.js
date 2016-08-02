const { html } = require('inu')
const { run } = require('inux')
const getFormData = require('get-form-data')

const { findOne, put } = require('../effects')
const { getProfilesByAgent } = require('../getters')

module.exports = viewProfile

function viewProfile (agent, model, dispatch) {
  const profilesByAgent = getProfilesByAgent(model)
  const profile = profilesByAgent[agent] || {}
  const { key, name, description } = profile

  return html`
    <section>
      <form onsubmit=${handleSubmit} onload=${handleLoad}>
        <input name='agent' type='hidden' value=${agent} />
        <fieldset>
          <label>name</label>
          <input name='name' type='text' value=${name || ''} />
        </fieldset>
        <fieldset>
          <label>description</label>
          <input name='description' type='text' value=${description || ''} />
        </fieldset>
        <input type='submit' value='save profile' />
      </form>
    </section>
  `

  function handleLoad () {
    dispatch(run(findOne({ index: 'agent', value: agent })))
  }

  function handleSubmit (ev) {
    ev.preventDefault()
    var nextProfile = getFormData(ev.target)
    if (key) nextProfile.key = key
    dispatch(run(put(nextProfile)))
  }
}
