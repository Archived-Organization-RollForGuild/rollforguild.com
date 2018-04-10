/* eslint-env jest */

// Module imports
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Enzyme, { mount } from 'enzyme'





// Component imports
import { setupDialogContainer } from '../_testHelpers'
import DialogWrapper from '../../components/DialogWrapper'




// Setup
Enzyme.configure({ adapter: new Adapter() })

function setup (extraProps) {
  const props = {
    ...extraProps,
  }

  setupDialogContainer()

  const enzymeWrapper = mount((
    <DialogWrapper {...props}>
      <div data-t="test:child" />
    </DialogWrapper>
  ))

  return {
    props,
    enzymeWrapper,
  }
}





// Tests
describe('Dialog Wrapper', () => {
  const { enzymeWrapper, props } = setup()
  let dialogWrapper = null

  const withProps = (_props = props) => {
    enzymeWrapper.setProps(_props)
    dialogWrapper = enzymeWrapper.find('[data-t="dialog:wrapper"]')
  }
  beforeEach(withProps)

  it('should not render itself by default', () => {
    expect(dialogWrapper.exists()).toBe(false)
  })

  it('should render if visible prop is true', () => {
    withProps({
      visible: true,
    })
    expect(dialogWrapper.exists()).toBe(true)
  })

  xit('should be rendered within the dialog container', () => {
  })

  xit('should render child components', () => {
  })
})
