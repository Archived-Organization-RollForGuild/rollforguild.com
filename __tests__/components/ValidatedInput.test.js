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
    onChange: jest.fn(),
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
    const input = enzymeWrapper.find('input')
    const messageList = enzymeWrapper.find('ul.messages')
    const validityIcon = enzymeWrapper.find('svg[data-icon="exclamation-triangle"]')
    const wrapper = enzymeWrapper.find('div.validated-input')

    expect(wrapper.exists()).toBe(true)
    expect(input.exists()).toBe(true)
    expect(validityIcon.exists()).toBe(true)
    expect(messageList.exists()).toBe(true)
  })

  it('should hide the validity icon and messages if the input hasn\'t received focus', () => {
    const { enzymeWrapper } = setup()
    const messageList = enzymeWrapper.find('ul.messages')
    const validityIcon = enzymeWrapper.find('svg[data-icon="exclamation-triangle"]')

    expect(validityIcon.prop('hidden')).toBe(true)
    expect(messageList.prop('hidden')).toBe(true)
  })

  xit('should return the input value in the onChange handler', () => {})

  describe('should display an error message and icon', () => {
    xit('if the input value doesn\'t match the pattern', () => {})
    xit('if the input value is the incorrect type', () => {})
    xit('if the input value is too long', () => {})
    xit('if the input value is empty but required', () => {})
  })
})
