const html = require('choo/html')
const gravatar = require('./gravatar')

module.exports = (user) => {
  return html`<div class="mdc-card demo-card">
    <section class="mdc-card__media demo-card__16-9-media">
      ${gravatar(user.email)}
    </section>
    <section class="mdc-card__primary">
      <h1 class="mdc-card__title mdc-card__title--large">${user.name}</h1>
      <h2 class="mdc-card__subtitle">${user.email}</h2>
    </section>
  </div>`
}
