const ty = require('mintype')

module.exports = Cid

function Id (value) {
  return ty.is(ty.Nil, value)
    ? generateId()
    : value
}

var id = 0
function generateId () {
  return (++id).toString()
}
