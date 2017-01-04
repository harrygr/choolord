const html = require('choo/html')
const authBar = require('../components/auth')

module.exports = child => (state, prev, send) => {
  return html`
  <div id="app">
    <div class="navbar mdc-theme--primary-bg mdc-theme--text-primary-on-primary mdc-typography--title mdc-elevation--z4">
      <span class="demo-menu material-icons">menu</span>
      <a class="nav-item" href="/">Home</a>
      <div class="nav-right">
        ${authBar(state, prev, send)}
      </div>
    </div>
    ${child(state, prev, send)}
  </div>
  `
}