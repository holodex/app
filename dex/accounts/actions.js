const { create } = require('inux')

const SET = Symbol('set')

const set = create(SET)

module.exports = {
  SET,
  set
}
