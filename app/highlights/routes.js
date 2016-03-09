const h = require('vdux/element').default

const Highlight = require('./components/highlight')
const HighlightList = require('./components/highlightList')

const { getIndexProps } = require('./getters')

const { map } = require('lodash')

module.exports = routes

function routes (route) {
  return route('/highlights',[ 
            route('/', (params, state) => {
              const props = getIndexProps(state)
              console.log('props', props)
                return h(HighlightList, {}, map(props.highlights, (highlight, highlightKey) => {
                  return h(Highlight, { highlight },[])
                }))
            })
    ])
}
