import state from 'state'
import Ui from 'ui'
import { configureStore } from 'store'
import actors from 'actors'
//
import vdux from 'vdux'
import { listen } from 'virtual-component'
import { handleOnce } from 'redux-effects-events'
import * as getters from 'graph/getters'
// HACK for webcola not requiring RBTree propoerly
global.RBTree = require('bintrees').RBTree

const store = configureStore(state)

store.subscribe(() => {
  console.log('state updating')
})

store.dispatch(handleOnce('domready', () => {
  listen(store.dispatch)
  vdux(
    store,
    (state) => {
      return Ui({ state, ...getters })
    },
    document.querySelector('body > main')
  )
}))
