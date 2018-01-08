// Module imports
import PropTypes from 'prop-types'





const Option = (props) => (
  <li className={props.className}>
    {props.children}
  </li>
)

Option.defaultProps = {
  className: null,
}

Option.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}





export default Option
