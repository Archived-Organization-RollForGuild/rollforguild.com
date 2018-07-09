// Module imports
import PropTypes from 'prop-types'





// Component imports
import Button from './Button'
import Component from './Component'





class Pagination extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _renderPageLinks () {
    const {
      category,
      currentPage,
      label,
      onPageChange,
      pagesToRender,
      totalPageCount,
    } = this.props
    const pageLinks = []
    const maxLinksToRender = Math.min(totalPageCount, pagesToRender)

    let startingPage = Math.floor(currentPage - (maxLinksToRender / 2))

    if (startingPage < 1) {
      startingPage = 1
    }

    if (totalPageCount > 1) {
      while (pageLinks.length < maxLinksToRender) {
        const pageNumber = startingPage + pageLinks.length
        const isCurrentPage = pageNumber === currentPage
        const classes = ['secondary']

        if (isCurrentPage) {
          classes.push('active')
        }

        pageLinks.push((
          <li
            data-t="pagination:pagelinks:item"
            data-tkey={pageNumber}
            key={pageNumber}>
            <Button
              action={`page::${pageNumber}`}
              category={category}
              className={classes.join(', ')}
              data-t="pagination:pagelinks:item:button"
              disabled={isCurrentPage}
              label={label}
              onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </Button>
          </li>
        ))
      }
    }

    return pageLinks
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods([])

    this.state = {}
  }

  render () {
    const {
      category,
      currentPage,
      label,
      onPageChange,
      showPageLinks,
      totalPageCount,
    } = this.props

    return (
      <nav
        className="pagination"
        data-t="pagination:wrapper">
        <Button
          action="page::previous"
          category={category}
          className="previous secondary"
          data-t="pagination:button:previous"
          disabled={!totalPageCount || (currentPage === 1)}
          label={label}
          onClick={() => onPageChange(currentPage - 1)}
          value={currentPage ? currentPage - 1 : null}>
          Previous
        </Button>

        {showPageLinks && (
          <ul
            className="inline"
            data-t="pagination:pagelinks:list">
            {this._renderPageLinks()}
          </ul>
        )}

        <Button
          action="page::next"
          category={category}
          className="next secondary"
          data-t="pagination:button:next"
          disabled={!totalPageCount || (currentPage === totalPageCount)}
          label={label}
          onClick={() => onPageChange(currentPage + 1)}
          value={currentPage ? currentPage + 1 : null}>
          Next
        </Button>
      </nav>
    )
  }
}





Pagination.defaultProps = {
  pagesToRender: 5,
  showPageLinks: true,
  totalPageCount: 0,
}

Pagination.propTypes = {
  category: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pagesToRender: PropTypes.number,
  showPageLinks: PropTypes.bool,
  totalPageCount: PropTypes.number,
}





export default Pagination
