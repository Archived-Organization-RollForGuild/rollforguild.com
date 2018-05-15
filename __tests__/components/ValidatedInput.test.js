/* eslint-env jest */

// Module imports
import { library } from '@fortawesome/fontawesome-svg-core'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Enzyme, { mount } from 'enzyme'





// Component imports
import * as faIcons from '../../helpers/faIconLibrary'
import ValidatedInput from '../../components/ValidatedInput'





// Setup
library.add(faIcons)

Enzyme.configure({ adapter: new Adapter() })

function setup (extraProps) {
  const props = {
    onBlur: jest.fn(),
    onInput: jest.fn(),
    pattern: '',
    required: true,
    type: 'text',
    value: '',
    ...extraProps,
  }

  const enzymeWrapper = mount((
    <ValidatedInput {...props} />
  ))

  return {
    props,
    enzymeWrapper,
  }
}





// Tests
describe('ValidatedInput', () => {
  it('should render itself', () => {
    const { enzymeWrapper } = setup()
    const input = enzymeWrapper.find('[data-t="validated-input:input"]')
    const messageList = enzymeWrapper.find('[data-t="validated-input:message-list"]')
    const validityIcon = enzymeWrapper.find('[data-icon="exclamation-triangle"]')
    const wrapper = enzymeWrapper.find('[data-t="validated-input:input"]')

    expect(wrapper.exists()).toBe(true)
    expect(input.exists()).toBe(true)
    expect(validityIcon.exists()).toBe(true)
    expect(messageList.exists()).toBe(true)
  })

  it('should hide the validity icon and messages if the input hasn\'t received focus', () => {
    const { enzymeWrapper } = setup()
    const messageList = enzymeWrapper.find('[data-t="validated-input:message-list"]')
    const validityIcon = enzymeWrapper.find('[data-icon="exclamation-triangle"]')

    expect(validityIcon.prop('hidden')).toBe(true)
    expect(messageList.prop('hidden')).toBe(true)
  })

  describe('should fire its event handlers', () => {
    const {
      enzymeWrapper,
      props,
    } = setup()
    const input = enzymeWrapper.find('[data-t="validated-input:input"]')

    it('onInput', () => {
      input.simulate('input')

      expect(props.onInput).toHaveBeenCalledTimes(1)
    })

    it('onBlur', () => {
      input.simulate('blur')

      expect(props.onBlur).toHaveBeenCalledTimes(1)
    })
  })

  // jsdom doesn't yet support the validity API, so we're skipping these tests until we can find a solution
  xdescribe('should display an error message and icon if the input value', () => {
    it('doesn\'t match the pattern', () => {})
    it('is the incorrect type', () => {})
    it('is too long', () => {})
    it('is empty but required', () => {})
  })
})
