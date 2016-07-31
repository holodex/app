const { html } = require('inu')
const { run } = require('inux')
const { findOne, put } = require('../effects')
const { getProfilesByAgent } = require('../getters')

const agentId = 'profile-agent'
const descriptionId = 'profile-description'
const nameId = 'profile-name'

module.exports = viewProfile

function viewProfile (agent, model, dispatch) {
  const profilesByAgent = getProfilesByAgent(model)
  const profile = profilesByAgent[agent] || {}
  const { key, name, description } = profile
  console.log('key', key)

  return html`
    <div  onload=${handleLoad}>
      <input id=${agentId} name='agent' type='hidden' value=${agent} />
      <div>
        <label>name</label>
        <p id=${nameId} contenteditable="true">${name || 'Enter agent name'}</p>
      </div>
      <div>
        <label>description</label>
        <p id=${descriptionId} contenteditable="true">${description || 'Enter agent description'}</p>
      </div>
      <button onclick=${save} >save</button>
    </div>
  `
  function handleLoad () {
    if (!agent || profile.key) return
    dispatch(run(findOne({ index: 'agent', value: agent })))

//    document.addEventListener('keydown', editControl(nameId, save))
    document.addEventListener('keydown', editControl(descriptionId, save))
  }
  
  function save () {
    console.log('key in save', key)
    var nextProfile = getProfileData()
    console.log(textContent(descriptionId))
    if (key) nextProfile.key = key
      console.log('nextProfile', nextProfile, key, agent)

    dispatch(run(put(nextProfile)))
  }

  function editControl (elementId, callback) {
    return function (ev) {
      const esc = ev.which === 27
      const carriageReturn = ev.which === 13
      const element = ev.target

      if (element.id === elementId) {
        if (esc) {
          document.execCommand('undo')
          element.blur()
        } else if (carriageReturn) {
          element.blur()
        }
      }
    }
  }

}


function textContent (id) {
  return document.querySelector(`#${id}`).textContent
}

function getProfileData () {
  return {
    name: textContent(nameId),
    description: textContent(descriptionId),
    agent: document.querySelector(`#${agentId}`).value
  }
}

