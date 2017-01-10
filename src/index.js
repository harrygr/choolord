const choo = require('choo')
const log = require('choo-log')

console.log('serving index')
const app = choo()
app.use(log())
// app.use({
//   wrapEffects (effect) {
//     return (state, payload, send, done) => {
//       effect(app._store.state(), payload, send, done)
//     }
//   }
// })

require('./models').map(app.model)

const middleware = require('./middleware')

const layout = require('./views/layout')
app.router([
  ['/', layout(require('./views/home'))],
  ['/login', middleware.redirectIfAuthenticated(layout(require('./views/login')))],
  ['/profile', middleware.redirectIfUnauthenticated(layout(require('./views/profile')))],
  ['/widgets', layout(require('./views/widgets'))],
  ['/map', layout(require('./views/map'))],
  ])

const tree = app.start()
document.body.appendChild(tree)
