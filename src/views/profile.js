const html = require('choo/html')
const profileCard = require('../components/profile-card')

module.exports = (state, _prev, send) => {
  return html`
  <section>
  <div class="columns">
  <div class="column is-half is-offset-one-quarter">
    ${profileCard(state.user.user)}
  </div>
  </div>
  </section>
  `
}