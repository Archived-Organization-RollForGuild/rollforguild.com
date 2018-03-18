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
          <li key={pageNumber}>
            <Button
              action={`page::${pageNumber}`}
              category={category}
              className={classes.join(', ')}
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
      <nav className="pagination">
        <Button
          action="page::previous"
          category={category}
          className="previous secondary"
          disabled={currentPage === 1}
          label={label}
          onClick={() => onPageChange(currentPage - 1)}
          value={currentPage - 1}>
          Previous
        </Button>

        {showPageLinks && (
          <ul className="inline">
            {this._renderPageLinks()}
          </ul>
        )}

        <Button
          action="page::next"
          category={category}
          className="next secondary"
          disabled={currentPage === totalPageCount}
          label={label}
          onClick={() => onPageChange(currentPage + 1)}
          value={currentPage + 1}>
          Next
        </Button>
      </nav>
    )
  }
}





Pagination.defaultProps = {
  pagesToRender: 5,
  showPageLinks: true,
  totalPageCount: 20,
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
