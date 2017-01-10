const html = require('choo/html')
const header = require('./header')
const pageSection = require('./page-section')
const footer = require('./footer')
const snackbar = require('../components/snackbar')

module.exports = child => (state, prev, send) => {
  if (!state.user.user.id && state.auth.accessToken) {
    send('user:fetch', {accessToken: state.auth.accessToken})
  }

  return html`
  <div id="app" class="mdl-demo mdl-color--grey-100 mdl-color-text--grey-700 mdl-base">
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      ${header(state, prev, send)}
      <main class="mdl-layout__content">
        <div class="page-container">
          <div class="mdl-card mdl-shadow--2dp page-section">
            <div class="mdl-card__supporting-text" style="overflow: visible;">
          ${child(state, prev, send)}
          </div>
          </div>
        </div>
        ${footer()}
      </main>
    </div>

    <div>${snackbar(state.alert.message)}</div>
  </div>
  `
}