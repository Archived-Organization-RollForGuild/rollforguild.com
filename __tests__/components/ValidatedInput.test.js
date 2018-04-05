/* eslint-env jest */

// Module imports
import '@fortawesome/fontawesome-free-solid'
import '@fortawesome/fontawesome-free-brands'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Enzyme, { mount } from 'enzyme'





// Component imports
import ValidatedInput from '../../components/ValidatedInput'





// Setup
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

  describe('should display an error message and icon if the input value', () => {
    xit('doesn\'t match the pattern', () => {})
    xit('is the incorrect type', () => {})
    xit('is too long', () => {})
    xit('is empty but required', () => {})
  })
})
