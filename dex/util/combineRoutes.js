module.exports = combineRoutes

function combineRoutes (apps) {
  return Object.keys(apps).reduce(
    (sofar, key) => {
      const routes = apps[key].routes
      return routes
        ? sofar.concat(routes)
        : sofar
    },
    []
  )
}
