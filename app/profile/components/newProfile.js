const h = require('vdux/element').default
const { Profile } = require('../models')
const validate = require('tcomb-validation').validate

const actions = require('../actions')

module.exports = {
  render,
  onCreate
}

function render ({ props }) {
  return h('form', {onSubmit: createProfile},
           h('label', {for: 'name'}, 'Name:'),
           h('input', {type: 'text', required: true, id: 'name'},[]),
           h('label', {for: 'note'}, 'Note:'),
           h('textarea', {id: 'note', required: true},[]),
           h('input', {type: 'file', id: 'image'}, [] ),
           h('button', {}, 'Create profile')
    )
}

function createProfile(ev) {
    ev.preventDefault()
    
    let form = ev.target

    let profile = {
        name: form.name.value,
        note: form.note.value,
        image: form.image.value
     }
     
     let profileResult = validate(profile, Profile)
     
     if (profileResult.isValid()) {
         return actions.create(profile)
     } else {
         profileErrors(profileResult.errors)
     }
}

function profileErrors(errors) {
    //TODO show error messages
    console.log('error', errors)
}

function onCreate () {
  return actions.find()
}
