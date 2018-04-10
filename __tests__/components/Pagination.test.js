/* eslint-env jest */

// Module imports
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Enzyme, { mount } from 'enzyme'





// Component imports
import Pagination from '../../components/Pagination'




// Setup
Enzyme.configure({ adapter: new Adapter() })

function setup (extraProps) {
  const props = {
    category: 'text',
    currentPage: 1,
    label: 'text',
    showPageLinks: false,
    onPageChange: jest.fn(),
    totalPageCount: 20,
    ...extraProps,
  }

  const enzymeWrapper = mount((
    <Pagination {...props} />
  ))

  return {
    props,
    enzymeWrapper,
  }
}





// Tests
describe('Pagination', () => {
  it('should render itself', () => {
    const { enzymeWrapper } = setup()
    const nav = enzymeWrapper.find('[data-t="pagination:wrapper"]')

    expect(nav.exists()).toBe(true)
  })

  describe('Previous page button', () => {
    const { enzymeWrapper, props } = setup()
    let nav = null
    let prevButton = null

    const withProps = (_props = props) => {
      enzymeWrapper.setProps(_props)
      nav = enzymeWrapper.find('[data-t="pagination:wrapper"]')
      prevButton = nav.find('[data-t="pagination:button:previous"]')
    }
    beforeEach(withProps)

    it('should be rendered', () => {
      expect(prevButton.exists()).toBe(true)
    })

    it('should be disabled if currentPage is 1', () => {
      withProps({
        currentPage: 1,
      })

      expect(prevButton.prop('disabled')).toBe(true)
    })

    it('should call onPageChange with the previous page number when clicked', () => {
      const currentPage = 7
      withProps({
        currentPage,
      })

      prevButton.simulate('click')
      expect(props.onPageChange).toHaveBeenCalledWith(currentPage - 1)
      expect(props.onPageChange).toHaveBeenCalledTimes(1)
    })
  })

  describe('Next page button', () => {
    const { enzymeWrapper, props } = setup()
    let nav = null
    let nextButton = null

    const withProps = (_props = props) => {
      enzymeWrapper.setProps(_props)
      nav = enzymeWrapper.find('[data-t="pagination:wrapper"]')
      nextButton = nav.find('[data-t="pagination:button:next"]')
    }
    beforeEach(withProps)

    it('should be rendered', () => {
      expect(nextButton.exists()).toBe(true)
    })

    it('should be disabled if currentPage is equal to totalPageCount', () => {
      withProps({
        currentPage: 20,
        totalPageCount: 20,
      })

      expect(nextButton.prop('disabled')).toBe(true)
    })

    it('should call onPageChange with the next page number when clicked', () => {
      const currentPage = 5
      withProps({
        currentPage,
      })

      nextButton.simulate('click')
      expect(props.onPageChange).toHaveBeenCalledWith(currentPage + 1)
      expect(props.onPageChange).toHaveBeenCalledTimes(1)
    })
  })

  describe('Page links', () => {
    const { enzymeWrapper, props } = setup({
      showPageLinks: true,
    })
    let ul = null
    let pageLinks = null

    const withProps = (_props = props) => {
      enzymeWrapper.setProps(_props)
      ul = enzymeWrapper.find('[data-t="pagination:pagelinks:list"]')
      pageLinks = ul.find('[data-t="pagination:pagelinks:item"]')
    }
    beforeEach(withProps)

    it('should be rendered if showPageLinks is true', () => {
      const pageLinkButtons = pageLinks.find('[data-t="pagination:pagelinks:item:button"]')
      expect(ul.exists()).toBe(true)
      expect(pageLinks.exists()).toBe(true)
      expect(pageLinkButtons.exists()).toBe(true)
    })

    it('should limit rendered links to the amount set by pagesToRender', () => {
      const pagesToRender = 10
      withProps({
        pagesToRender,
      })

      expect(pageLinks).toHaveLength(pagesToRender)
    })

    it('should limit rendered links to the number of total pages if pagesToRender is higher than totalPageCount', () => {
      const totalPageCount = 5
      withProps({
        pagesToRender: 20,
        totalPageCount,
      })

      expect(pageLinks).toHaveLength(totalPageCount)
    })

    it('should disable the pageLink corresponding to the current page.', () => {
      const currentPage = 5
      withProps({
        currentPage,
      })
      const currentPageButton = pageLinks.find(`[data-tkey=${currentPage}]`).find('[data-t="pagination:pagelinks:item:button"]')

      expect(currentPageButton.prop('disabled')).toBe(true)
    })

    it('should have pageLinks which call onPageChange with their corresponding page number', () => {
      const currentPage = 5
      withProps({
        currentPage,
        totalPageCount: 10,
        pagesToRender: 20,
      })

      pageLinks.forEach(pageLink => {
        const pageNum = pageLink.prop('data-tkey')
        if (pageNum === currentPage) {
          return
        }

        pageLink.find('[data-t="pagination:pagelinks:item:button"]').simulate('click')
        expect(props.onPageChange).toHaveBeenCalledWith(pageNum)
      })
    })
  })
})
