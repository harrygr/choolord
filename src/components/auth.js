const html = require('choo/html')

module.exports = (state, prev, send) => {
  const isLoggedIn = !!state.auth.accessToken

  const logout = (e) => {
    send('auth:unstore')
    e.preventDefault()
  }

  const name = state.user.user ? state.user.user.name : ''

  return html`
  <div>
    ${isLoggedIn ? '' : html`<a class="nav-item" href="/login">Login</a>`}
    ${isLoggedIn ? html`<span class="nav-item">Hey ${name}! <a href="" onclick=${logout}>Logout</a></span>` : ''}
  </div>
  `
}

