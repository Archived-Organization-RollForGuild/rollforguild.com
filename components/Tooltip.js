// Module imports
import PropTypes from 'prop-types'





const propsToCapture = [
  'alignment',
  'attachment',
  'children',
]





const Tooltip = props => {
  const {
    alignment,
    attachment,
    children,
  } = props
  const filteredProps = {}

  for (const [key, value] of Object.entries(props)) {
    if (!propsToCapture.includes(key)) {
      filteredProps[key] = value
    }
  }

  return (
    <div
      {...filteredProps}
      data-attachment={attachment}
      data-alignment={alignment}
      role="tooltip">
      {children}
    </div>
  )
}





Tooltip.defaultProps = {
  alignment: 'center',
  attachment: 'bottom',
}

Tooltip.propTypes = {
  alignment: PropTypes.string,
  attachment: PropTypes.string,
}





export default Tooltip
