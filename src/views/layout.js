const html = require('choo/html')
const header = require('./header')
const pageSection = require('./page-section')
const footer = require('./footer')
const snackbar = require('../components/snackbar')

module.exports = child => (state, prev, send) => {
  send('user:fetchIfRequired')

  return html`
  <div id="app" class="mdl-demo mdl-color--grey-100 mdl-color-text--grey-700 mdl-base">
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      ${header(state, prev, send)}
      <main class="mdl-layout__content">
        <div class="page-container">
          ${pageSection(child(state, prev, send))}
        </div>
        ${footer()}
      </main>
    </div>

    ${snackbar(state.alert.message)}
  </div>
  `
}