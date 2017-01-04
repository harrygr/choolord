const redirectIfAuthenticated = view => (state, prev, send) => {
  if (!!state.auth.accessToken) {

    send('location:set', '/')
  }
  return view(state, prev, send)
}

const redirectIfUnauthenticated = view => (state, prev, send) => {
  if (!state.auth.accessToken) {
    send('location:set', 'login')
  }
  return view(state, prev, send)
}

module.exports = {redirectIfAuthenticated, redirectIfUnauthenticated}