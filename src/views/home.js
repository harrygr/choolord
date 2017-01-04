const html = require('choo/html')

module.exports = (state, prev, send) => {
  return html`<div>
  <h1 class="mdc-typography--display1">Welcome</h1>
  <p>You'll need to login to get anywhere. <a href="/login">Login here</a></p>
  </div>
  `
}