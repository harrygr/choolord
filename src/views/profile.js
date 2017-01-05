const html = require('choo/html')
const profileCard = require('../components/profile-card')
const addressLookup = require('../components/address-lookup')

module.exports = (state, _prev, send) => {
  const onselected = (address) => {
    console.log('You selected this result:', address)
  }

  return html`
  <article>
    <div class="columns">
      <div class="column is-half">
        ${profileCard(state.user.user)}
      </div>

      <div class="column">
        <h4>Enter Your Address</h4>

        ${addressLookup(state, _prev, send, {onselected})}

      </div>
    </div>
  </article>
  `
}