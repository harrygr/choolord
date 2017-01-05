const html = require('choo/html')

module.exports = (state, prev, send) => {
  const isLoggedIn = !!state.auth.accessToken

  const logout = (e) => {
    send('auth:unstore')
    e.preventDefault()
  }

  const name = state.user.user ? state.user.user.name : ''

  return html`
  <span>
    ${isLoggedIn ? '' : html`<a class="mdl-navigation__link" href="/login">Login</a>`}
    ${isLoggedIn ? html`<a class="mdl-navigation__link" href="" onclick=${logout}>Logout</a>` : ''}
  </span>
  `
}

