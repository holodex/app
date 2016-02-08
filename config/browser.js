const config = require('./')
const R = require('ramda')

module.exports = R.map(
  function (subConfig) {
    const noSecrets = function (val, key) {
      return (key === 'secret') ?
        undefined : val
    }
    return R.mapObjIndexed(noSecrets, subConfig)
  },
  config
)
