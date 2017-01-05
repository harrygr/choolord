const html = require('choo/html')

module.exports = ({
  type = 'button',
  label = 'Submit',
  onclick = () => {}
} = {}) => {
   return html`
   <button
    class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
    type=${type}
    onclick=${onclick}
    >
   ${label}
   </button>`
}