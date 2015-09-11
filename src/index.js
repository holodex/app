import state from 'state'
import React from 'react'
import { createStore, combineReducers, createRedux } from 'redux'
import Ui from 'ui'
import types from 'types'
import map from 'lodash.map'
import mapValues from 'lodash.mapvalues'
var debug = require('debug')('index')

let App = combineReducers(mapValues(types, type => { return type.reducers }))
debug('state', state)


let store = createStore(App, state)
debug('store', store)

React.render(
  React.createElement(Ui, {
    store: store
  }),
  document.querySelector('body > main')
)
