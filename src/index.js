import state from 'state'
// import React from 'react'
// import ReactDOM from 'react-dom'
// import { createStore, combineReducers, createRedux } from 'redux'
// import { Provider } from 'react-redux'
import Ui from 'ui'
import { configureStore } from 'store'
import actors from 'actors'
//
import vdux from 'vdux'
import { listen } from 'virtual-component'
import { handleOnce } from 'redux-effects-events'
import el from 'vdom-element'
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
      return el(Ui, {state, ...getters})
    },
    document.querySelector('body > main')
  )
}))
