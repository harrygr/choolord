const html = require('choo/html')
const textfield = require('../components/textfield')


module.exports = (state, _prev, send) => {
    const onSubmit = e => {
      send('login:getToken')
      e.preventDefault()
    }

    function renderErrors(errors) {
      return html`<span class="mdl-textfield__error">${errors.map(error => html`<span>${error}<br></span>`)}</span>`
    }

    return html`
    <article>
      <h1 class="mdl-typography--display-1">Login</h1>
        <form onsubmit=${onSubmit} novalidate>
          <div class="columns">
            <div class="column">
            ${textfield({
              label: 'Email',
              id: 'email',
              type: 'email',
              value: state.login.form.email,
              oninput: value => send('login:setField', {key: 'email', value}),
              errors: state.login.errors.email
            })}
            </div>

            <div class="column">
              ${textfield({
                label: 'Password',
                id: 'password',
                type: 'password',
                value: state.login.form.password,
                oninput: value => send('login:setField', {key: 'password', value}),
                errors: state.login.errors.password
              })}
            </div>
          </div>

          <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit">Login</button>
        </form>
      </article>
    `
}