module.exports = [
  require('./login')(),
  require('./auth')({storage: window.localStorage}),
  require('./user')(),
  require('./alert')(),
  require('./address')()
]