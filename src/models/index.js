const pages = [
require('./login')(),
require('./auth')({storage: window.localStorage}),
require('./user')(),
]

const components = [
  require('./alert')(),
  require('./address')(),
  require('./map'),
  require('../components/counter').model(),
  require('../components/dropdown').model
]

module.exports = [...pages, ...components]