const { Action } = require('inux')

const SET = Symbol('set')

const set = Action(SET)

module.exports = {
  SET,
  set
}
