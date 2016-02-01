const { createSelector, createStructuredSelector } = require('reselect')

const getTodos = (state) => state.todos.records

const getIndexProps = createStructuredSelector({
  todos: getTodos
})

module.exports = {
  getIndexProps
}
