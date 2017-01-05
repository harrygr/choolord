const html = require('choo/html')
const gravatar = require('./gravatar')

module.exports = (user) => {
  return html`
  <div class="demo-card-wide mdl-card mdl-shadow--2dp" style="width:100%">
    <section class="mdl-card__title" style="background: url(${gravatar(user.email)}); background-size: 100% auto; background-repeat: no-repeat; height: 276px;">
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
