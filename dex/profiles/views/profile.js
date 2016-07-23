const { html } = require('inu')
const { run } = require('inux')
const getFormData = require('get-form-data')

const { findOne, put } = require('../effects')
const { getProfilesByAgent } = require('../getters')

module.exports = viewProfile

function viewProfile (agentId, model, dispatch) {
  const profilesByAgent = getProfilesByAgent(model)
  const profile = profilesByAgent[agentId] || {}
  const { name, description } = profile

  return html`
    <form onsubmit=${handleSubmit} onload=${handleLoad}>
      <fieldset>
        <label>name</label>
        <input name='name' type='text' value=${name || ''} />
      </fieldset>
      <fieldset>
        <label>description</label>
        <input name='description' type='text' value=${description || ''} />
      </fieldset>
      <input name='agentId' type='hidden' value=${agentId} />
      <input type='submit' value='save' />
    </form>
  `

/*
  return html`
    <div onload=${handleLoad}>
      <h1>${ profile.name }</h1>
      <p>${ profile.description }</p>
    </div>
  `
*/

  function handleLoad () {
    if (!agentId || profile.key) return
    dispatch(run(findOne({ index: 'agentId', value: agentId })))
  }

  function handleSubmit (ev) {
    ev.preventDefault()
    const nextProfile = getFormData(ev.target)
    dispatch(run(put(nextProfile)))
  }
}
