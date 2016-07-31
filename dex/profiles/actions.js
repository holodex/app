const { Action } = require('inux')

const SET = Symbol('set')
const EDIT = Symbol('edit')

const set = Action(SET)
const edit = Action(EDIT)

module.exports = {
  SET,
  set,
  EDIT,
  edit
}

