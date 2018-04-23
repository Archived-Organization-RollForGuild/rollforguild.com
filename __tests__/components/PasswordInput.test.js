/* eslint-env jest */

// Module imports
import '@fortawesome/fontawesome-free-solid'
import '@fortawesome/fontawesome-free-brands'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Enzyme, { mount } from 'enzyme'





// Component imports
import PasswordInput from '../../components/PasswordInput'





// Setup
Enzyme.configure({ adapter: new Adapter() })

function setup (extraProps) {
  const props = {
    onValidate: jest.fn(),
    showStrength: true,
    showWarnings: true,
    showSuggestions: true,
    ...extraProps,
  }

  const enzymeWrapper = mount((
    <PasswordInput {...props} />
  ))

  return {
    props,
    enzymeWrapper,
  }
}





// Tests
describe('PasswordInput', () => {
  it('should render itself', () => {
    const { enzymeWrapper } = setup()
    const button = enzymeWrapper.find('[data-t="password-input:reveal-button"]')
    const input = enzymeWrapper.find('[data-t="password-input:input"]')
    const messageList = enzymeWrapper.find('[data-t="validated-input:message-list"]')
    const strengthMeter = enzymeWrapper.find('[data-t="password-input:strength-meter"]')
    const validityIcon = enzymeWrapper.find('[data-icon="exclamation-triangle"]')
    const wrapper = enzymeWrapper.find('[data-t="password-input:input"]')

    expect(wrapper.exists()).toBe(true)
    expect(input.exists()).toBe(true)
    expect(button.exists()).toBe(true)
    expect(strengthMeter.exists()).toBe(true)
    expect(validityIcon.exists()).toBe(true)
    expect(messageList.exists()).toBe(true)
  })

  it('should change the input\'s type when the reveal button is toggled on', () => {
    const { enzymeWrapper } = setup()
    const button = enzymeWrapper.find('[data-t="password-input:reveal-button"]')
    let input = enzymeWrapper.find('[data-t="password-input:input"]')

    expect(input.prop('type')).toBe('password')

    button.simulate('click', { preventDefault () {} })

    input = enzymeWrapper.find('[data-t="password-input:input"]')

    expect(input.prop('type')).toBe('text')
  })

  it('should update the strength meter to represent the password\'s strength', () => {
    const { enzymeWrapper } = setup()

    enzymeWrapper.setState({ passwordStrength: 4 })

    const strengthMeter = enzymeWrapper.find('[data-t="password-input:strength-meter"]')

    expect(strengthMeter.prop('value')).toEqual(4)
  })

  describe('units', () => {
    describe('_handleShowPasswordClick', () => {
      const { enzymeWrapper } = setup()
      const fakeEvent = { preventDefault () {} }
      const instance = enzymeWrapper.instance()

      it('should toggle the showPassword state', () => {
        instance._handleShowPasswordClick(fakeEvent)

        expect(enzymeWrapper.state('showPassword')).toEqual(true)

        instance._handleShowPasswordClick(fakeEvent)

        expect(enzymeWrapper.state('showPassword')).toEqual(false)
      })
    })

    // Skipping until we figure out how to deal with validity state
    xdescribe('_validate', () => {
      it('should update passwordStrength', () => {})

      it('should update messages', () => {})

      it('should validate the password', () => {})
    })
  })
})
