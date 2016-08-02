const { Action } = require('inux')

const SET = Symbol('set')
const UNSET = Symbol('unset')

const set = Action(SET)
const unset = Action(UNSET)

module.exports = {
  SET,
  set,
  UNSET,
  unset
}
