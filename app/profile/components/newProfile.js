const h = require('vdux/element').default
const { Profile } = require('../models')

const actions = require('../actions')

module.exports = {
  render,
  onCreate
}

function render ({ props }) {
  return h('form', {onSubmit: createProfile},
           h('label', {for: 'name'}, 'Name:'),
           h('input', {type: 'text', id: 'name'},[]),
           h('label', {for: 'note'}, 'Note:'),
           h('textarea', {id: 'note'},[]),
           h('input', {type: 'file', id: 'image'}, [] ),
           h('button', {}, 'Create profile')
    )
}

function createProfile(ev) {
    ev.preventDefault()
    
    const form = ev.target

    const profile = Profile({
        name: form.name.value,
        note: form.note.value,
        image: form.image.value
     })
     return actions.create(profile)
}

function onCreate () {
  return actions.find()
}
