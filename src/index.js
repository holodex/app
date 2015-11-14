import state from 'state'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, createRedux } from 'redux'
import Ui from 'ui'
import holodex from 'reducers'
import actors from 'actors'
console.log('holodex', holodex)
var debug = require('debug')('index')

debug('state', state)

let store = createStore(holodex, state)
console.log('store', store)
debug('store', store.getState())

let acting = false
store.subscribe(function() {
  // debug('graph', store.getState().graph)

  if (!acting) {
    acting = true

    for (let actor of actors) {
      actor(store.getState(), store.dispatch)
    }

    acting = false
  }
})


ReactDOM.render(
  React.createElement(Ui, {
    store: store
  }),
  document.querySelector('body > main')
)
