const redirectIfAuthenticated = view => (state, prev, send) => {
  if (!!state.auth.accessToken) {
    send('location:set', '/')
  }
  return view(state, prev, send)
}

module.exports = {redirectIfAuthenticated}