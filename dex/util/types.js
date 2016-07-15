
const ty = require('mintype')

function Id (value) {
  return ty.String(value)
}

function Cid (value) {
  return !ty.is(Id, value)
    ? generateId()
    : value
}

var id = 0
function generateId () {
  return (++id).toString()
}

module.exports = {
  Id,
  Cid
}
