const minimist = require('minimist')
const deepAssign = require('deep-assign')

const config = require('./')

module.exports = cliConfig

function cliConfig (argv, name) {
  const args = minimist(argv.slice(2))

  return Object.assign(
    {},
    config,
    {
      [name]: deepAssign(
        {},
        config[name],
        args,
        { _: config[name]._ }
      )
    }
  )
}
