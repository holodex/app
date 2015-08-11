var FsDb = require('fs-db')
var yaml = require('js-yaml')
var pull = require('pull-stream')
var clone = require('lodash.clone')
var Model = require('base/model')
var toCsv = require('to-csv')
var forEach = require('lodash.foreach')
var fs = require('fs')

var store = require('base/store')

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
var types = require('types')

pullGraph(function (err, graph) {
  if (err) { throw err; }

  var graphByTypes = {}

  forEach(graph, function (item) {
    var typeName = item.getType()
    graphByTypes[typeName] = graphByTypes[typeName] || []
    graphByTypes[typeName].push(item)
  })

  forEach(graphByTypes, function (typeGraph, typeName) {
    var csv = toCsv(getType(graphByTypes, typeName))
    var path = process.cwd() + "/csv/" + types[typeName].Model.prototype.collectionName + ".csv"
    fs.writeFile(path, csv, function (err) {
      if (err) { throw err }
    })
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
        var model = Model.new(item)
        model.save()
        return model
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
      id: getId(agent.getId()),
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
  var roles = graph['Role'].filter(function (role) {
    return !role.relationship
  }).map(function (role) {
    return {
      context: role.context,
      role: role.type.split('/')[1],
      agent: role.agent.split('/')[1]
    }
  })
  if (roles.length === 0) {
    roles.push({ context: "", role: "", agent: "" })
  }
  return roles
}

function getRoleTypes (graph) {
  return graph['RoleType'].map(function (roleType) {
    return {
      id: getId(roleType.id),
      relationshipType: getId(roleType.relationshipType.getId()),
      labels: roleType.labels,
      queryLabels: roleType.queryLabels
    }
  })
}

function getRelationships(graph) {
  return graph['Relationship'].map(function (relationship) {
    var roles = relationship.rolesByType
    var linkType = relationship.type.linkTypes[0]
    var context = relationship.context
    return {
      context: context && getId(context.getId()),
      source: getId(roles[linkType.source.getId()].agent.getId()),
      link: getId(linkType.getId()),
      target: getId(roles[linkType.target.getId()].agent.getId())
    }
  })
}

function getRelationshipTypes (graph) {
  return graph['RelationshipType'].map(function (relType) {
    return {
      id: getId(relType.id),
      description: relType.description
    }
  })
}

function getLinkTypes (graph) {
  return graph['LinkType'].map(function (linkType) {
    return {
      id: getId(linkType.id),
      relationshipType: getId(linkType.relationshipType.getId()),
      source: getId(linkType.source.getId()),
      target: getId(linkType.target.getId()),
      labels: linkType.labels,
      queryLabels: linkType.queryLabels
    }
  })
}

function getId (id) {
  if (!id) { return null }
  var s = id.split('/')
  return s[s.length - 1]
}
