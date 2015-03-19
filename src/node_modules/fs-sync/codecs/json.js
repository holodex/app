var extend = require('xtend')
var encodings = require('level-codec/lib/encodings')

module.exports = extend(encodings.json, {
  encode: function encode (obj) {
    return JSON.stringify(obj, null, 2)
  },
  decode: function decode (str) {
    return JSON.parse(str)
  },
})
