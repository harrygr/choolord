const html = require('choo/html')
const gravatar = require('./gravatar')

module.exports = (user) => {
  return html`
  <div class="demo-card-wide mdl-card mdl-shadow--2dp" style="width:100%">
    <section class="mdl-card__title">
      <img src=${gravatar(user.email)} alt="Avatar for ${user.name}" style="height: auto; width: 100%;" />
      <h2 class="mdl-card__title-text">${user.name}</h2>
    </section>
    <section class="mdl-card__supporting-text">
      <p class="">
        ${user.email}<br>
        ${user.phone}
      </p>
    </section>
  </div>
  `
}
