const { html } = require('inu')
const { run } = require('inux')
const { findOne, put } = require('../effects')
const { getProfilesByAgent } = require('../getters')
const css = require('sheetify')
const reduce = require('lodash/fp/reduce')

const prefix = css`
  p {
    width: 100%;
    padding-top: 10px;
  }
`
module.exports = viewProfile

function viewProfile (agent, model, dispatch) {
  const profilesByAgent = getProfilesByAgent(model)
  const profile = profilesByAgent[agent] || {}
  const { key, name, description } = profile
  console.log('key', key)

  return html`
    <div class=${prefix} onload=${handleLoad}>
      <input name='agent' type='hidden' value=${agent} />
      <div>
        <label>name</label>
        <p data-name="name" contenteditable="true">${name || 'Enter agent name'}</p>
      </div>
      <div>
        <label>description</label>
        <p data-name="description" contenteditable="true">${description || 'Enter agent description'}</p>
      </div>
      <button onclick=${save} >save</button>
    </div>
  `
  function handleLoad () {
    if (!agent || profile.key) return
    dispatch(run(findOne({ index: 'agent', value: agent })))

  }
  
  function save () {
    var nextProfile = getProfileData(document.querySelector(`.${prefix}`))
    console.log('nextProfile', nextProfile)
    if (key) nextProfile.key = key

    dispatch(run(put(nextProfile)))
  }

}

function getProfileData (parent) {
  return reduce((acc, descendent) => {
    if (descendent.name) {
      acc[descendent.name] = descendent.value 
    }
    if (descendent.dataset.name) {
      acc[descendent.dataset.name] = descendent.textContent
    }
    return acc
  }, {})(parent.querySelectorAll('*'))
}

