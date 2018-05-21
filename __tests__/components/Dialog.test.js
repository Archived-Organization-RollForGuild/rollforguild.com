/* eslint-env jest */

// Module imports
import { library } from '@fortawesome/fontawesome-svg-core'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Enzyme, { mount } from 'enzyme'





// Component imports
import { setupDialogContainer } from '../_testHelpers'
import * as faIcons from '../../helpers/faIconLibrary'
import Dialog from '../../components/Dialog'




// Setup
library.add(faIcons)

Enzyme.configure({ adapter: new Adapter() })

function setup (extraProps) {
  const props = {
    ...extraProps,
  }

  setupDialogContainer()

  const enzymeWrapper = mount((
    <Dialog {...props}>
      <div data-t="dialog:child" />
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
  let dialog = null

  const withProps = (_props = props) => {
    enzymeWrapper.setProps(_props)
    dialog = enzymeWrapper.find('[data-t="dialog:dialog"]')
  }
  beforeEach(withProps)

  it('should render itself', () => {
    expect(dialog.exists()).toBe(true)
  })

  it('should render it\'s children within the dialog', () => {
    withProps({
      visible: true,
    })

    const child = dialog.find('[data-t="dialog:child"]')

    expect(child.exists()).toBe(true)
  })

  it('should render controls', () => {
    withProps({
      controls: {
        primary: [(<div />)],
        secondary: [(<div />)],
      },
    })

    const primaryControls = dialog.find('[data-t="dialog:primary-controls"]')
    const secondaryControls = dialog.find('[data-t="dialog:secondary-controls"]')

    expect(primaryControls.exists()).toBe(true)
    expect(secondaryControls.exists()).toBe(true)
  })

  it('should apply modal styles if dialog is a modal', () => {
    withProps({ modal: true })

    expect(dialog.hasClass('modal')).toBe(true)
  })
})
