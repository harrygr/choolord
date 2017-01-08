const html = require('choo/html')
const component = require('./component')

const closeIfClickedOutside = (elm, close) => e => {
  if (!elm.contains(e.target)) {
    close()
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
            return component.update(state.instances, id, {...state.instances[id], visible: false})
          },
          toggleVisible (state, id) {
            console.log('reducer toggleVisible')
            return component.update(state.instances, id, {...state.instances[id], visible: !state.instances[id].visible})
          }
        }
      }
    },

    behaviour: (send, id) => {
      return {
        close: () => {
          send('dropdown:close', id)
        },
        toggle: () => {
          send('dropdown:toggleVisible', id)
        }
      }
    },

    view: ({
      visible = false,
      items = [],
      setup = () => {},
      teardown = () => {},
      toggle = () => {},
      close = () => {}
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

module.exports = component.build(dropdownDefinition)
