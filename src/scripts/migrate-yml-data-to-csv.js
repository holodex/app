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
    console.log(toCsv(getType(graphByTypes, typeName)))
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

function getType (graph, type) {
  switch (type) {
    case "Person": return getPeople(graph)
    case "Group": return getGroups(graph)
    case "Role": return getRoles(graph)
    case "RoleType": return getRoleTypes(graph)
    case "Relationship": return getRelationships(graph)
    case "RelationshipType": return getRelationshipTypes(graph)
    case "LinkType": return getLinkTypes(graph)
  }
}

function getAgent (graph, type) {
  return graph[type].map(function (agent) {
    return {
      id: agent.id.split('/')[1],
      name: agent.name,
      image: agent.image
    }
  })
}

function getPeople (graph) {
  return getAgent(graph, 'Person')
}

function getGroups (graph) {
  return getAgent(graph, 'Group')
}

function getRoles (graph) {
  return graph['Role']
}

function getRoleTypes (graph) {
  return graph['RoleType']
}

function getRelationships(graph) {
  return graph['Relationship']
}

function getRelationshipTypes (graph) {
  return graph['RelationshipType']
}

function getLinkTypes (graph) {
  return graph['LinkType']
}
