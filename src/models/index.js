module.exports = [
  require('./login'),
  require('./auth')(window.localStorage),
  require('./user')
]