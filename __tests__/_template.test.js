/* eslint-env jest */

// Module imports
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Enzyme, { mount } from 'enzyme'





// Component imports
import Component from '../components/Component'




// Setup
Enzyme.configure({ adapter: new Adapter() })

function setup (extraProps) {
  const props = {
    ...extraProps,
  }

  const enzymeWrapper = mount((
    <Component {...props} />
  ))

  return {
    props,
    enzymeWrapper,
  }
}





// Tests
describe('Component Name', () => {
  it('should render itself', () => {
    const { enzymeWrapper } = setup()

    // test basic dom structure
  })

  describe('element inside component', () => {
    const { enzymeWrapper, props } = setup()
    let foo = null

    const withProps = (_props = props) => {
      enzymeWrapper.setProps(_props)
      foo = enzymeWrapper.find('[data-t="foo"]')
      // define common element finds.
    }
    beforeEach(withProps)

    it('should render', () => {
      //test element dom structure
    })

    it('should do something if prop is something', () => {
      withProps({ bar: 'test-specific prop sets' })

      // test stuff that depends on props
    })
  })
})
