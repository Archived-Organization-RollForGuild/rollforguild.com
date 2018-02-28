// Module imports
import PropTypes from 'prop-types'





// Component imports
import Component from './Component'





class Pagination extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _renderPageLinks () {
    const {
      currentPage,
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
            <button
              className={classes.join(', ')}
              disabled={isCurrentPage}
              onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </button>
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
      currentPage,
      onPageChange,
      showPageLinks,
      totalPageCount,
    } = this.props

    return (
      <nav className="pagination">
        <button
          className="previous secondary"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}>
          Previous
        </button>

        {showPageLinks && (
          <ul className="inline">
            {this._renderPageLinks()}
          </ul>
        )}

        <button
          className="next secondary"
          disabled={currentPage === totalPageCount}
          onClick={() => onPageChange(currentPage + 1)}>
          Next
        </button>
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
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pagesToRender: PropTypes.number,
  showPageLinks: PropTypes.bool,
  totalPageCount: PropTypes.number,
}





export default Pagination
