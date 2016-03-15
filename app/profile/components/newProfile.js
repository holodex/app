const h = require('vdux/element').default
const { Profile } = require('../models')
const NewHighlightList = require('../../highlights/components/newHighlightList')
const NewHighlight = require('../../highlights/components/newHighlight')

const validate = require('tcomb-validation').validate

const { filter } = require('lodash')

const actions = require('../actions')
const highlightActions = require('../../highlights/actions')

module.exports = {
  render,
  onCreate
}

function render ({ props }) {
  return h('form', { onSubmit: createProfile, style: { width: '200px' } },
           h('label', {for: 'name'}, 'Name:'),
           h('input', {type: 'text', required: true, id: 'name'}, []),
           h('label', {for: 'note'}, 'Note:'),
           h('textarea', {id: 'note', required: true}, []),
           h('input', {type: 'file', id: 'image'}, []),
           h(NewHighlightList, {}, [NewHighlight, NewHighlight]),
           h('button', {}, 'Create profile')
    )
}

function createProfile (ev) {
  ev.preventDefault()

  let form = ev.target.children

  let profile = {
    name: form.name.value,
    note: form.note.value,
    image: form.image.value
  }

  let profileResult = validate(profile, Profile)

  if (profileResult.isValid()) {
    // TODO upload image
    return (dispatch) => {
      const highlights = filter(form.newHighlightList.children, (highlight) => {
        // Hack - remove buttons from list of children
        return highlight.value
      }).map((highlight) => {
        return Object.assign({note: highlight.value})
      })

      return dispatch(actions.create(profile))
        .then((createdAction) => {
          const profile = createdAction.payload.body
          return Promise.all(highlights.map((highlight) => {
            return dispatch(highlightActions.create(
                Object.assign({ profileId: profile.id }, highlight)
              ))
          }))
        })
    }
  } else {
    profileErrors(profileResult.errors)
  }
}

function profileErrors (errors) {
  // TODO show error messages
  console.log('error', errors)
}

function onCreate () {
  return actions.find()
}
