import state from 'state'
import Ui from 'ui'
import { configureStore } from 'store'
import actors from 'actors'
//
import vdux from 'vdux'
import { listen } from 'virtual-component'
import { handleOnce } from 'redux-effects-events'
import * as getters from 'graph/getters'
// import { getProps } from 'getters'
import dom from 'virtex-dom'
import { holodex } from 'reducers'
import element from 'virtex-element'


const debug = require('debug')('index')
// HACK for webcola not requiring RBTree propoerly
global.RBTree = require('bintrees').RBTree

const store = configureStore(state)
debug('store', store)

store.subscribe(() => {
  console.log('store updating...', store.getState())
})



document.addEventListener('DOMContentLoaded', () => {
  vdux(
    store,
    Ui,
    document.querySelector('body > main')
  )

  store.dispatch({ type: 'initialized' })

})
