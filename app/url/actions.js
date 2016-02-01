const _bindUrl = require('bind-url')

const URL_NEW = 'URL_NEW'

module.exports = {
  URL_NEW,
  newUrl,
  bindUrl
}

function newUrl (url) {
  return {
    type: URL_NEW,
    payload: url
  }
}

function bindUrl () {
  return function (dispatch) {
    _bindUrl({
      wnd: window,
      root: document.body
    }, (url) => {
      dispatch(newUrl(url))
    })
  }
}
