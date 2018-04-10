/* eslint-env jest */

// Module imports
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Enzyme, { mount } from 'enzyme'





// Component imports
import helpers, { setupDialogContainer } from '../_testHelpers'
import { Avatar } from '../../components/Avatar'




// Setup
Enzyme.configure({ adapter: new Adapter() })

function setup (extraProps) {
  const props = {
    cachedAvatar: null,
    updateAvatar: jest.fn(),
    size: 'small',
    src: {
      id: 'api-uuid',
      type: 'users',
      attributes: {
        avatar: true,
      },
    },
    ...extraProps,
  }
  console.log(helpers)
  console.log(setupDialogContainer)
  setupDialogContainer()

  const enzymeWrapper = mount((
    <Avatar {...props} />
  ))

  return {
    props,
    enzymeWrapper,
  }
}





// Tests
describe('Avatar', () => {
  const { enzymeWrapper, props } = setup()
  let avatarDiv = null

  const withProps = (_props = props) => {
    enzymeWrapper.setProps(_props)
    avatarDiv = enzymeWrapper.find('[data-t="avatar:avatar"]')
  }
  beforeEach(withProps)

  it('should render itself', () => {
    expect(avatarDiv.exists()).toBe(true)
  })

  it('should not render edit button by default', () => {
    const editOverlay = avatarDiv.find('[data-t="avatar:avatar:edit-overlay"]')
    expect(editOverlay.exists()).toBe(false)
  })

  it('should render edit button if editable prop is true', () => {
    withProps({
      editable: true,
    })
    const editOverlay = avatarDiv.find('[data-t="avatar:avatar:edit-overlay"]')
    expect(editOverlay.exists()).toBe(true)
  })

  it('should render AvatarUploader when edit button is clicked', () => {
    withProps({
      editable: true,
    })
    const editOverlay = avatarDiv.find('[data-t="avatar:avatar:edit-overlay"]')

    editOverlay.simulate('click')

    const uploader = enzymeWrapper.find('[data-t="avatar:avatar-uploader"]')
    expect(uploader.exists()).toBe(true)
  })

  it('should display an API avatar if the src object is valid and confirms avatar existance', () => {
    expect(avatarDiv.get(0).props.style).toHaveProperty('backgroundImage', `url(/api/users/${props.src.id}/avatar)`)
  })

  it('should display an adorable.io avatar if the src object is valid, but no api avatar exists', () => {
    withProps({
      src: {
        ...props.src,
        attributes: {
          avatar: false,
        },
      },
    })

    expect(avatarDiv.get(0).props.style).toHaveProperty('backgroundImage', `url(//api.adorable.io/avatars/100/${props.src.id})`)
  })

  it('should display cached avatar if cachedAvatar is defined', () => {
    const cachedAvatar = 'i_am_totally_a_image_data_string'
    withProps({
      cachedAvatar,
    })

    expect(avatarDiv.get(0).props.style).toHaveProperty('backgroundImage', `url(${cachedAvatar})`)
  })
})
