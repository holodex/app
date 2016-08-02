const { Effect } = require('inux')

const FIND = Symbol('find')
const PUT = Symbol('put')
const DEL = Symbol('del')

const find = Effect(FIND)
const put = Effect(PUT)
const del = Effect(DEL)

module.exports = {
  FIND,
  find,
  PUT,
  put,
  DEL,
  del
}
