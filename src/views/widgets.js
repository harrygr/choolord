const html = require('choo/html')
const makeCounter = require('../components/counter').component
const menuItem = require('../components/dropdown-menu--item')
const makeDropdown = require('../components/dropdown').component

module.exports = (state, prev, send) => {
  const counter = makeCounter(state, prev, send)
  const dropdown = makeDropdown(state, prev, send)

  const menuItems = () => [
    menuItem({content: 'Some Item'}),
    menuItem({content: 'Some Other Item'}),
    menuItem({content: 'Some Other Item', divider: true}),
    menuItem({content: 'Some Other Item'}),
    menuItem({content: 'Some Disabled Item', disabled: true}),
  ]

  const menu2Items = () => [
    menuItem({content: 'Some Awesome Item'}),
    menuItem({content: 'Some Other Item', divider: true}),
    menuItem({content: 'Some Sweet Item', disabled: true}),
    menuItem({content: 'An item with a longer body'}),
  ]

  return html`
    <article>
    <div>
      <br />

      ${dropdown('my-menu-2', {
        props: {items: menu2Items()},
        initialState: { visible: true }
      })}
      </div>
    </article>
  `
}
