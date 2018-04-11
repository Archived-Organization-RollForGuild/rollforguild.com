/* eslint-env jest */

// Module imports
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Enzyme, { mount } from 'enzyme'





// Component imports
import Button from '../../components/Button'





// Setup
Enzyme.configure({ adapter: new Adapter() })

function setup (extraProps) {
  const props = {
    onClick: jest.fn(),
    action: 'text',
    category: 'text',
    label: 'text',
    ...extraProps,
  }

  const enzymeWrapper = mount((
    <Button {...props}>
      test
    </Button>
  ))

  return {
    props,
    enzymeWrapper,
  }
}





// Tests
describe('Button', () => {
  it('should render itself', () => {
    const { enzymeWrapper } = setup()
    const button = enzymeWrapper.find('[data-t="button:button"]')

    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('test')
  })

  it('should call onClick when clicked', () => {
    const { enzymeWrapper, props } = setup()
    const button = enzymeWrapper.find('button')

    button.simulate('click')
    expect(props.onClick).toHaveBeenCalledTimes(1)
  })
})
