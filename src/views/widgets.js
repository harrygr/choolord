const html = require('choo/html')
const makeCounter = require('../components/counter').component
const makeDropdown = require('../components/dropdown').component
const menuItem = require('../components/dropdown-menu--item')

module.exports = (state, prev, send) => {
  const counter = makeCounter(state, prev, send)
  const dropdown = makeDropdown(state, prev, send)

  const menuItems = () => [
    menuItem({content: 'Some Item'}),
    menuItem({content: 'Some Other Item', divider: true}),
    menuItem({content: 'Some Other Item', divider: true}),
    menuItem({content: 'Some Other Item', divider: true}),
    menuItem({content: 'Some Disabled Item', disabled: true}),

  ]

  return html`
    <article>
      ${counter('abcas', {initialState: {count: 5000}})}
      <br />
      ${counter('llasdfhdj')}

      <br />
      ${dropdown('my-menu', {
        props: {items: menuItems()},
        initialState: {}
      })}

      ${dropdown('my-menu-2', {
        props: {items: menuItems()},
        initialState: { visible: true }
      })}
    </article>
  `
}