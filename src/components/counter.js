const html = require('choo/html')
const button = require('./button')
const component = require('./component')


const counterDefinition = () => {
  return {
    model () {
      return {
        namespace: 'counter',
        state: {
          instances: {}
        },
        reducers: {
          increment (state, id) {
            const prev = state.instances[id].count

            return component.update(state.instances, id, {
              ...state.instances[id],
              count: prev + 1
            })
          }
        }
      }
    },

    view ({
      count = 0,
      hovered = false,
      setup = () => {},
      teardown = () => {},
      onincr = () => {},
      onmouseenter = () => { console.log('the mouse entered!') },
      onmouseout = () => { console.log('the mouse left!') },
    } = {}) {
      return html`
      <div onunload=${teardown} onload=${setup}>
        ${button({
          onclick: onincr,
          label: 'Increment'
        })}
        <span onmouseenter=${onmouseenter} onmouseout=${onmouseout}>${count}</span>

        ${hovered ? html`<span>This is toggled</span>` : ''}
      </div>
      `
    },

    behaviour (send, id) {
      return {
        onincr () {
          send('counter:increment', id)
        },
        onmouseenter () {
          send('counter:setProp', {id, key: 'hovered', value: true})
        },
        onmouseout () {
          send('counter:setProp', {id, key: 'hovered', value: false})
        }
      }
    },

    defaultState () {
      return {
        count: 0,
        hovered: false
      }
    }
  }
}

module.exports = component.build(counterDefinition)
