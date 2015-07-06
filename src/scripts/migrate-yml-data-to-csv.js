var FsDb = require('fs-db')
var yaml = require('js-yaml')
var pull = require('pull-stream')
var clone = require('lodash.clone')
var Model = require('base/model')
var toCsv = require('to-csv')
var forEach = require('lodash.foreach')

// terrible monkey patch
Model.prototype.initialize = function () {}

var db = FsDb({
  location: process.cwd() + "/data",
  idAttribute: '@id',
  codec: {
    type: 'yml',
    encode: function (obj) {
      return yaml.safeDump(obj)
    },
    decode: function (str) {
      return yaml.safeLoad(str)
    }
  }
})

var graph
var latestCommit

pullGraph(function (err, graph) {
  if (err) { throw err; }

  var graphByTypes = {}

  forEach(graph, function (item) {

    var typeName = item['@type']
    delete item['@type']

    graphByTypes[typeName] = graphByTypes[typeName] || []

    graphByTypes[typeName].push(item)
  })

  forEach(graphByTypes, function (typeGraph, typeName) {
    console.log("type: ", typeName)
    console.log(toCsv(typeGraph))
  })
})

function pullGraph (cb) {
  pull(
    db.createReadStream(),
    pull.map(function (item) {
      var attrs = clone(item)

      // rename idAttribute to '@id'
      attrs['@id'] = attrs.id
      delete attrs.id

      // TODO find more general solution to embedded objects
      //
      // if embedded role, reference parent relationship
      var embeddedRoleRe = /(.*relationships\/[^\/#]+)/
      var embeddedRoleMatch = attrs['@id'].match(embeddedRoleRe)
      if (embeddedRoleMatch) {
        attrs.relationship = embeddedRoleMatch[1]
      }

      return attrs
    }),
    pull.collect(function (err, arr) {
      if (err) { return cb(err) }

      var pulledGraph = arr
      .filter(function (item) {
        // HACK forget about @mixmix's helper objects
        return !(Object.keys(item).length === 2 && item.agent)
      })
      .map(function (item) {
        var attrs = Model.new(item).toJSON()
        // rename idAttribute back to 'id'
        attrs.id = attrs['@id']
        delete attrs['@id']
        return attrs
      })

      cb(null, pulledGraph)
    })
  )
}
