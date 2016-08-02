const { Effect } = require('inux')

const FIND = Symbol('find')
const PUT = Symbol('put')
const GET = Symbol('get')

const find = Effect(FIND)
const get = Effect(GET)
const put = Effect(PUT)

module.exports = {
  FIND,
  GET,
  PUT,
  find,
  get,
  put
}
