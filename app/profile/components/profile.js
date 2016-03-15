const h = require('vdux/element').default

const Highlight = require('../../highlights/components/Highlight')
const HighlightList = require('../../highlights/components/HighlightList')

const { map } = require('lodash')

const actions = require('../actions')


module.exports = {
  render,
  onCreate
}

function render ({ props }) {
  return h('div', { style: {'border': '1px solid black'} },
           h('p', {}, props.profile.name),
           h('p', {}, props.profile.note),
           h('p', {}, props.profile.image),
           h(HighlightList, {}, map(props.profile.highlights, (highlight, highlightKey) => {
             return h(Highlight, { highlight }, [])
           }))
    )
}

function onCreate () {
  return actions.find()
}
