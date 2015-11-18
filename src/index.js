import state from 'state'
// import React from 'react'
// import ReactDOM from 'react-dom'
// import { createStore, combineReducers, createRedux } from 'redux'
// import { Provider } from 'react-redux'
import Ui from 'ui'
import holodex from 'store'
import actors from 'actors'
//
import vdux from 'vdux'
import { listen } from 'virtual-component'
import { handleOnce } from 'redux-effects-events'
import el from 'vdom-element'

// HACK for webcola not requiring RBTree propoerly
global.RBTree = require('bintrees').RBTree
//
// console.log('holodex', holodex)
// var debug = require('debug')('index')
//
// debug('state', state)
//
// let store = createStore(holodex, state)
//
// debug('store', store.getState())

const store = holodex(state)
//
//
let acting = false
store.subscribe(function() {
  console.log('state updating', store.getState().graph.nodes)
  // debug('graph', store.getState().graph)
  // debug('Nodes', store.getState().graph.nodes)

  if (!acting) {
    acting = true

    for (let actor of actors) {
      actor(store.getState(), store.dispatch)
    }

    acting = false
  }
})

// vdux code

// console.log(<Ui {...state} />)

store.dispatch(handleOnce('domready', () => {
  listen(store.dispatch)
  vdux(store, state => <Ui {...state} />, document.querySelector('body > main'))
}))




// ReactDOM.render(
//   <Provider store={store} >
//     <Ui/>
//   </Provider>,
//   document.querySelector('body > main')
// )
