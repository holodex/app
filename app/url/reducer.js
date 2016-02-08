module.exports = urlReducer

function urlReducer (state = '/', action) {
  switch (action.type) {
    case 'URL_NEW':
      return action.payload
    default:
      return state
  }
}
