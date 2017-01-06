const html = require('choo/html')
const {updateInstanceWithId, removeInstanceWithId, getDefaultListeners, getDefaultReducers} = require('./helpers')

const closeIfClickedOutside = (elm, close) => e => {
  if (!elm.contains(e.target)) {
    console.log('should close')
    close()
  }
}

const createComponent = (definition) => {
  const component = definition()
  const model = component.model()
  return {
    model: () => ({
      namespace: model.namespace,
      state: {
        ...model.state,
        instances: {}
      },
      reducers: {
        ...model.reducers,
        ...getDefaultReducers(component.defaultState)
      }
    }),
    component: (globalState, prev, send) => (id, { initialState = {}, props = {} }) => {
      const currentInstanceState = globalState[model.namespace].instances[id] ? globalState[model.namespace].instances[id] : component.defaultState()
      return component.view({
        ...getDefaultListeners(model.namespace, send, { id, initialState }),
        ...currentInstanceState,
        ...props,
        ...component.behaviour(send, id)
      })
    }
  }
}

const dropdownDefinition = () => {
  return {
    model () {
      return {
        namespace: 'dropdown',
        state: {},
        reducers: {
          close (state, id) {
            return updateInstanceWithId(state.instances, id, {...state.instances[id], visible: false})
          },
          toggleVisible (state, id) {
            console.log('reducer toggleVisible')
            return updateInstanceWithId(state.instances, id, {...state.instances[id], visible: !state.instances[id].visible})
          }
        }
      }
    },

    behaviour: (send, id) => {
      return {
        close: () => {

          console.log('proper close method')
          send('dropdown:close', id)
        },
        toggle: () => {
          console.log('proper toggle visible method')
          send('dropdown:toggleVisible', id)
        }
      }
    },

    view: ({
      visible = false,
      items = [],
      setup = () => {},
      teardown = () => {},
      toggle = () => { console.log('default toggle method') },
      close = () => { console.log('default close method') }
    } = {}) => {
      const onload = elm => {
        elm.getRootNode().addEventListener('click', closeIfClickedOutside(elm, close))
        setup()
      }

      const onunload = elm => {
        elm.getRootNode().removeEventListener('click', closeIfClickedOutside(elm, close))
        teardown()
      }

      return html`
        <div class="dropdown" onload=${onload} onunload=${onunload}>
          <button id="demo-menu-lower-left"
                  class="mdl-button mdl-js-button mdl-button--icon"
                  onclick=${toggle}
                  >
            <i class="material-icons">more_vert</i>
          </button>

          <span onclick=${close}>Close me</span>

          <div class="mdl-menu__container ${visible ? 'is-visible' : ''}" style="">
            <ul class="dropdown-menu mdl-card mdl-shadow--2dp" for="demo-menu-lower-left">
              ${items.map(item => html`${item}`)}
            </ul>
          </div>

        </div>
      `
    },

    defaultState () {
      return {
        visible: false
      }
    }
  }
}

const dropdown = createComponent(dropdownDefinition)

console.log(dropdown)
module.exports = { model: dropdown.model, component: dropdown.component }