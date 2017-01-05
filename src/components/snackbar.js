const html = require('choo/html')

module.exports = (message) => {
  return html`
  <div class="mdl-snackbar ${message ? 'mdl-snackbar--active' : ''}">
    <div class="mdl-snackbar__text">${message}</div>
    <button class="mdl-snackbar__action" type="button"></button>
  </div>
`
}
