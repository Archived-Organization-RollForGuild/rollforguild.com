import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import Link from './Link'





const PageNavigation = props => ReactDOM.createPortal(
  (
    <ul>
      {props.pages.map(page => {
        const {
          key,
          title,
          ...linkProps
        } = page

        const renderedTitle = typeof title === 'function' ? title() : title

        return (
          <li key={key} className={props.activePage === key ? 'active' : ''}>
            <Link {...linkProps}>
              {renderedTitle}
            </Link>
          </li>
        )
      })}
    </ul>
  ),
  document.getElementById('page-navigation')
)





PageNavigation.defaultProps = {}

PageNavigation.propTypes = {
  activePage: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    params: PropTypes.object,
    route: PropTypes.string.isRequired,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
  })).isRequired,
}





export default PageNavigation
