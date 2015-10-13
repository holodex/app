import state from 'state'
import React from 'react'
import { createStore, combineReducers, createRedux } from 'redux'
import Ui from 'ui'
import types from 'types'
import map from 'lodash.map'
import mapValues from 'lodash.mapvalues'
import holodex from 'reducers'
console.log('holodex', holodex)
var debug = require('debug')('index')

debug('state', state)

let store = createStore(holodex, state)
console.log('store', store)
debug('store', store)

store.subscribe(() => {
  console.log(store.getState())
})

React.render(
  React.createElement(Ui, {
    store: store
  }),
  document.querySelector('body > main')
)
