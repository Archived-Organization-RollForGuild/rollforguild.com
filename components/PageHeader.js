// Module imports
// import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'





const PageHeader = props => (
  <header className="page">
    <label
      className="button secondary"
      htmlFor="application-banner-control">
      <FontAwesomeIcon icon="bars" fixedWidth />
    </label>

    {props.children}
  </header>
)





PageHeader.defaultProps = {}

PageHeader.propTypes = {}





export default PageHeader
