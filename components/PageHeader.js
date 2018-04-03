// Module imports
// import PropTypes from 'prop-types'
import ReactDom from 'react-dom'





const PageHeader = (props) => {
  if (typeof window === 'undefined') {
    return null
  }

  return ReactDom.createPortal(
    props.children,
    document.querySelector('header.page')
  )
}





PageHeader.defaultProps = {}

PageHeader.propTypes = {}





export default PageHeader
