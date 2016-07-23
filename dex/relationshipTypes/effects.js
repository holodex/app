const { Effect } = require('inux')

const FIND = Symbol('find')
const PUT = Symbol('put')

const find = Effect(FIND)
const put = Effect(PUT)

module.exports = {
  FIND,
  find,
  PUT,
  put
}
