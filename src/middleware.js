const html = require('choo/html')

const redirectIfAuthenticated = view => (state, prev, send) => {
  if (!!state.auth.accessToken) {
    send('alert:growl', 'You are already logged in')
    send('location:set', '/')
    return html`<div></div>`
  }
  return view(state, prev, send)
}

const redirectIfUnauthenticated = view => (state, prev, send) => {
  if (!state.auth.accessToken) {
    send('alert:growl', 'You must be logged in to go here')
    send('location:set', 'login')
    return html`<div></div>`
  }
  return view(state, prev, send)
}

module.exports = {redirectIfAuthenticated, redirectIfUnauthenticated}