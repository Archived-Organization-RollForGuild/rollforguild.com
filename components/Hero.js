// Module imports
import PropTypes from 'prop-types'
import VideoCover from 'react-video-cover'





const Hero = props => {
  const {
    children,
    gravity,
    size,
    src,
    type,
  } = props
  const classes = ['hero']
  const style = {}

  if (type === 'image') {
    style.backgroundImage = `url(${src})`
  }

  if (gravity) {
    style.backgroundPosition = gravity.toLowerCase()
  }

  classes.push(size)

  return (
    <div
      className={classes.join(' ')}
      style={style}>
      {((type === 'video') && (typeof window !== 'undefined')) && (
        <VideoCover
          videoOptions={{
            autoPlay: true,
            controls: false,
            loop: true,
            muted: true,
            src,
          }} />
      )}
      {children}
    </div>
  )
}





Hero.defaultProps = {
  gravity: 'center',
  size: 'half',
  type: 'image',
}

Hero.propTypes = {
  gravity: (props, propName, componentName) => {
    const prop = props[propName]

    const horizontals = ['left', 'center', 'right']
    const verticals = ['bottom', 'center', 'top']

    const gravityHasHorizontal = horizontals.some(horizontal => prop.includes(horizontal))
    const gravityHasVertical = verticals.some(vertical => prop.includes(vertical))

    if ((!gravityHasHorizontal || !gravityHasVertical) && prop.split(' ').length < 2) {
      throw new Error(`Invalid prop ${propName} supplied to ${componentName}. Validation failed.`)
    }
  },
  size: PropTypes.oneOf(['full', 'half', 'one-third', 'two-thirds']),
  src: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['image', 'video']),
}





export default Hero
