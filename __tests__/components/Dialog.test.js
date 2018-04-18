/* eslint-env jest */

// Module imports
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Enzyme, { mount } from 'enzyme'





// Component imports
import { setupDialogContainer } from '../_testHelpers'
import Dialog from '../../components/Dialog'




// Setup
Enzyme.configure({ adapter: new Adapter() })

function setup (extraProps) {
  const props = {
    ...extraProps,
  }

  setupDialogContainer()

  const enzymeWrapper = mount((
    <Dialog {...props}>
      <div data-t="test:child" />
    </Dialog>
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
  let dialogBox = null

  const withProps = (_props = props) => {
    enzymeWrapper.setProps(_props)
    dialogWrapper = enzymeWrapper.find('[data-t="dialog:wrapper"]')
    dialogBox = dialogWrapper.find('[data-t="dialog:box"]')
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
    expect(dialogBox.exists()).toBe(true)
  })

  it('should render it\'s children within the dialogBox', () => {
    withProps({
      visible: true,
    })
    expect(dialogBox.find('[data-t="test:child"]').exists()).toBe(true)
  })

  it('should apply background to positioner if wrapper is a modal with lightsOff prop set', () => {
    withProps({
      lightsOff: true,
      mode: 'modal',
    })

    expect(dialogWrapper.hasClass('lights-off')).toBe(true)
  })
})
