/* eslint-env jest */

// Module imports
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Enzyme, { mount } from 'enzyme'





// Component imports
import DateTimePicker from '../../components/DateTimePicker'





// Setup
Enzyme.configure({ adapter: new Adapter() })

function setup () {
  const props = {
    value: new Date(),
    onChange: jest.fn(),
  }
  const enzymeWrapper = mount((
    <DateTimePicker {...props} />
  ))

  return {
    enzymeWrapper,
    props,
  }
}





// Tests
describe('DateTimePicker', () => {
  it('should render itself', () => {
    const { enzymeWrapper } = setup()
    const wrapper = enzymeWrapper.find('[data-t="date-time-picker:wrapper"]')
    const dayPicker = wrapper.find('[data-t="date-time-picker:day-input"]')
    const timeInput = wrapper.find('[data-t="date-time-picker:time-input"]')

    expect(wrapper.exists()).toBe(true)
    expect(dayPicker.exists()).toBe(true)
    expect(timeInput.exists()).toBe(true)
  })

  it('should call onChange when date is changed', () => {
    const { enzymeWrapper, props } = setup()
    const dayPickerInput = enzymeWrapper.find('[data-t="date-time-picker:day-input"]').find('input')


    dayPickerInput.simulate('change', {
      target: {
        value: '2010-01-01',
      },
    })

    expect(props.onChange).toHaveBeenCalledTimes(1)
  })

  it('should call onChange when time is changed', () => {
    const { enzymeWrapper, props } = setup()
    const timeInput = enzymeWrapper.find('[data-t="date-time-picker:time-input"]')


    timeInput.simulate('change', {
      target: {
        value: '13:37',
      },
    })

    expect(props.onChange).toHaveBeenCalledTimes(1)
  })
})
