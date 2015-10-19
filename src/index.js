import state from 'state'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, createRedux } from 'redux'
import Ui from 'ui'
import holodex from 'reducers'
console.log('holodex', holodex)
var debug = require('debug')('index')

debug('state', state)

let store = createStore(holodex, state)
console.log('store', store)
debug('store', store.getState())

ReactDOM.render(
  React.createElement(Ui, {
    store: store
  }),
  document.querySelector('body > main')
)
