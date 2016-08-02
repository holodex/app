const { Effect } = require('inux')

const FIND_ONE = Symbol('findOne')
const PUT = Symbol('put')

const findOne = Effect(FIND_ONE)
const put = Effect(PUT)

module.exports = {
  FIND_ONE,
  findOne,
  PUT,
  put
}
