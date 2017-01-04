const html = require('choo/html')
const authBar = require('../components/auth')

module.exports = child => (state, prev, send) => {
  const onload = () => {
    if (state.auth.accessToken && !state.user.user.id) {
      send('user:fetch', state.auth)
    }
  }

  return html`
  <div id="app" onload=${onload}>
    <div class="navbar mdc-theme--primary-bg mdc-theme--text-primary-on-primary mdc-typography--title mdc-elevation--z4">
      <span class="demo-menu material-icons">menu</span>
      <a class="nav-item" href="/">Home</a>
      <a class="nav-item" href="/profile">Profile</a>
      <div class="nav-right">
        ${authBar(state, prev, send)}
      </div>
    </div>
    <div class="container">
      ${child(state, prev, send)}
    </div>
  </div>
  `
}