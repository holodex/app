const h = require('vdux/element').default

module.exports = {
  render
}

function render ({ props, children }) {
  return h('div', {}, [
    h('h1', {
      textContent: 'Holodex'
    }),
    renderNav({
      items: [{
        href: '/',
        text: 'home'
      }, {
        href: '/todos',
        text: 'todos'
      }]
    }),
    h('div', {}, children)
  ])
}

function renderNav (props) {
  return h('ul', {}, props.items.map((item) => {
    return renderNavItem(item)
  }))
}

function renderNavItem (props) {
  return h('a', {
    href: props.href
  }, [
    h('li', {
      textContent: props.text
    })
  ])
}
