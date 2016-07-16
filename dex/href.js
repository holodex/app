const { handleActions, handleEffects } = require('inux')
const href = require('sheet-router/href')
const history = require('sheet-router/history')
const Pushable = require('pull-pushable')

const INIT = Symbol('init')
const SET = Symbol('set')

/*
const Router = require('sheet-router')
const router = Router('/404', function (route) {
  return [
    route('/', (params) => yo`<div>where are you?</div>`),
    route('/:place', (params) => yo`<div>welcome to ${params.place}</div>`, [
  ]
})
*/

// routing demo
module.exports = {

  init: () => ({
    model: document.location.href,
    effect: INIT
  }),

  update: handleActions({
    [SET]: (model, href) => ({ model: href })
  }),

  run: handleEffects({
    [INIT]: (_, sources) => {
      const effectActions = Pushable(function onClose (error) {
        // cleanup href and/or history
        console.error(error)
      })
      // enable catching <href a=""></href> links
      href(push)
      // enable HTML5 history API
      history(push)

      return effectActions

      function push (href) {
        effectActions.push({
          type: SET,
          payload: href
        })
      }
    }
  })
}
