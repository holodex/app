const { create } = require('inux')

const RUN = Symbol('run')

const run = create(RUN)

module.exports = {
  RUN,
  run
}
