require('material-design-lite')
const choo = require('choo')
const log = require('choo-log')


const app = choo()
app.use(log())

require('./models').map(app.model)

const middleware = require('./middleware')

const layout = require('./views/layout')
app.router([
  ['/', layout(require('./views/home'))],
  ['/login', middleware.redirectIfAuthenticated(layout(require('./views/login')))]
  ])


const tree = app.start()
document.body.appendChild(tree)

// const constraints = {
//   title: {presence: true, length: {minimum: 3}},
//   url: {presence: true, url: true}
// }

// const initErrors = () => ({title: [], url: []})
// const initForm = () => ({title: '', url: ''})

// app.model({
//   state: {
//     form: initForm(),
//     errors: initErrors(),
//     links: [
//       {title: 'Some Link', url: 'http://goodlord.co'},
//       {title: 'Some Other Linky', url: 'http://google.com'}
//     ]
//   },
//   reducers: {
//     setField: (state, data) => ({...state, form: {...state.form, [data.key]: data.value}}),

//     addLink (state) {
//       const validator = validate(state.form, constraints)
//       if (validator) {
//         return {...state, errors: {...initErrors(), ...validator}}
//       }
//       return {...state, links: state.links.concat(state.form), errors: initErrors(), form: initForm()}
//     }
//   }
// })

// const view = (state, prev, send) => {
//   function onSubmit(e) {
//     send('addLink')

//     e.preventDefault()
//   }

//   function renderErrors(errors) {
//     return html`<p class="mdc-textfield-helptext mdc-textfield-helptext--persistent mdc-textfield-helptext--validation-msg">
//     ${errors.map(error => html`<span>${error}<br></span>`)}
//     </p>`
//   }

//   return html`
//   <div class="columns">
//   <div class="column is-half is-offset-one-quarter">
//   <h1 class="mdc-typography--display1">Links</h1>
//   <form onsubmit=${onSubmit}>
//     <div>
//     <br>
//     <div class="mdc-textfield mdc-textfield--upgraded ${state.errors.title.length ? 'mdc-textfield--invalid' : ''}">
//       <input class="mdc-textfield__input" value=${state.form.title} type="text" id="link-title" onkeyup=${(e) => send('setField', {key: 'title', value: e.target.value})} />
//       <label class="mdc-textfield__label mdc-textfield__label--float-above" for="link-title">Title</label>
//     </div>
//     ${state.errors.title.length ? renderErrors(state.errors.title) : ''}
//     </div>
//     <div>
//     <br>
//     <div class="mdc-textfield mdc-textfield--upgraded ${state.errors.url.length ? 'mdc-textfield--invalid' : ''}">
//       <input class="mdc-textfield__input" type="text" value=${state.form.url} id="link-url" onkeyup=${(e) => send('setField', {key: 'url', value: e.target.value})} />
//       <label class="mdc-textfield__label mdc-textfield__label--float-above" for="link-url">URL</label>
//     </div>
//     ${state.errors.url.length ? renderErrors(state.errors.url) : ''}
//     </div>
//     <button class="mdc-button mdc-js-button mdc-button--raised mdc-js-ripple-effect mdc-button--accent" type="submit">Add Link</button>
//   </form>
//   <ul class="mdc-list">

//     ${state.links.map(link => html`<li class="mdc-list-item">
//       <a href=${link.url}>${link.title}</a>
//       </li>`)}
//   </ul>
//   </div>
//   </div>
//   `
// }


