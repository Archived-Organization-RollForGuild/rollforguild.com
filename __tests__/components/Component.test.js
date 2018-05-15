/* eslint-env jest */

// Module imports
import { library } from '@fortawesome/fontawesome-svg-core'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Enzyme, { mount } from 'enzyme'





// Component imports
import * as faIcons from '../../helpers/faIconLibrary'
import Component from '../../components/Component'





// Setup
library.add(faIcons)

Enzyme.configure({ adapter: new Adapter() })

jest.useRealTimers()


function setup () {
  const debouncedMethod = jest.fn()

  class Blep extends Component {
    boundMethod () { return this }

    constructor (props) {
      super(props)

      this.debouncedMethod = debouncedMethod

      this._bindMethods([
        '_handleChange',
        'boundMethod',
      ])
      this._debounceMethods(['debouncedMethod'])

      this.state = {
        foo: 'bar',
      }
    }

    render () {
      return (
        <input
          data-t="component:input"
          name="foo"
          onChange={this._handleChange}
          value={this.state.foo} />
      )
    }
  }

  const enzymeWrapper = mount((
    <Blep />
  ))

  return {
    debouncedMethod,
    enzymeWrapper,
  }
}





// Tests
describe('Component', () => {
  it('should render itself', () => {
    const { enzymeWrapper } = setup()
    const input = enzymeWrapper.find('[data-t="component:input"]')

    expect(input.exists()).toBe(true)
  })

  it('should bind methods', () => {
    const { enzymeWrapper } = setup()
    const instance = enzymeWrapper.instance()

    expect(instance.boundMethod.call()).toBe(instance)
  })

  it('should debounce methods', done => {
    const {
      debouncedMethod,
      enzymeWrapper,
    } = setup()
    const instance = enzymeWrapper.instance()

    instance.debouncedMethod()

    expect(debouncedMethod).not.toHaveBeenCalled()

    setTimeout(() => {
      expect(debouncedMethod).toHaveBeenCalledTimes(1)
      done()
    }, 500)
  })

  it('should handle changes', () => {
    const { enzymeWrapper } = setup()
    const input = enzymeWrapper.find('[data-t="component:input"]')

    input.simulate('change', {
      target: {
        name: 'foo',
        value: 'blep',
      },
    })

    expect(enzymeWrapper.state('foo')).toBe('blep')
  })
})
