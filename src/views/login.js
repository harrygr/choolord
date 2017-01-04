const html = require('choo/html')

module.exports = (state, _prev, send) => {
    const onSubmit = e => {
      send('login:getToken')
      e.preventDefault()
    }

    function renderErrors(errors) {
      return html`<p class="mdc-textfield-helptext mdc-textfield-helptext--persistent mdc-textfield-helptext--validation-msg">
      ${errors.map(error => html`<span>${error}<br></span>`)}
      </p>`
    }

    return html`
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
      <h1 class="mdc-typography--display1">Login</h1>
        <form onsubmit=${onSubmit} novalidate>
          <div>
          <br>
          <div class="mdc-textfield mdc-textfield--fullwidth mdc-textfield--upgraded ${state.login.errors.email.length ? 'mdc-textfield--invalid' : ''}">
            <input class="mdc-textfield__input" value=${state.login.form.email} type="email" id="link-title" oninput=${e => send('login:setField', {key: 'email', value: e.target.value})} />
            <label class="mdc-textfield__label mdc-textfield__label--float-above" for="link-title">Email</label>
          </div>
          ${state.login.errors.email.length ? renderErrors(state.login.errors.email) : ''}

          </div>
          <div>
          <br>
          <div class="mdc-textfield mdc-textfield--fullwidth mdc-textfield--upgraded ${state.login.errors.password.length ? 'mdc-textfield--invalid' : ''}">
            <input class="mdc-textfield__input" type="password" value=${state.login.form.password} id="link-url" oninput=${e => send('login:setField', {key: 'password', value: e.target.value})} />
            <label class="mdc-textfield__label mdc-textfield__label--float-above" for="link-url">Password</label>
          </div>
          ${state.login.errors.password.length ? renderErrors(state.login.errors.password) : ''}

          </div>
          <button class="mdc-button mdc-js-button mdc-button--raised mdc-js-ripple-effect mdc-button--accent" type="submit">Login</button>
        </form>
      </div>
    </div>
    `
}