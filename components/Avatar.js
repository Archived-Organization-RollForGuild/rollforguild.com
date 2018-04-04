// Module Imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'





// Component Imports
import { actions } from '../store'
import AvatarUploader from './AvatarUploaderDialog'
import Component from './Component'





// Component Constants
const srcType = {
  groups: 'groups',
  'group-members': 'users',
  'join-requests': 'users',
  users: 'users',
}

const avatarSize = {
  tiny: {
    name: 'tiny',
    px: 40,
  },
  small: {
    name: 'small',
    px: 100,
  },
  medium: {
    name: 'medium',
    px: 200,
  },
  large: {
    name: 'large',
    px: 400,
  },
}





class Avatar extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _toggleUploaderDisplay (show) {
    this.setState({ displayUploader: typeof show === 'boolean' ? show : !this.state.showAvatarEdit })
  }

  async _handleUploaderComplete (_fileBlob) {
    const {
      updateAvatar,
    } = this.props

    const {
      id,
      type,
    } = this.state

    const fileBlob = _fileBlob

    fileBlob.name = `${srcType[type]}-${id}-avatar`

    const { status } = await updateAvatar(srcType[type], id, fileBlob)

    if (status !== 'success') {
      return 'File Upload Error. Please Try again.'
    }

    this.setState({
      displayUploader: false,
    })

    return null
  }

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentWillReceiveProps (nextProps) {
    if (!nextProps.src) {
      throw new ReferenceError('props.src is not defined')
    }

    const {
      id,
      type,
      attributes,
    } = nextProps.src

    const size = { ...avatarSize[nextProps.size] }
    const hasAvatar = srcType[type] && attributes && attributes.avatar

    this.setState({
      id,
      type,
      size,
      avatarUrl: hasAvatar ? `/api/${srcType[type]}/${id}/avatar` : `//api.adorable.io/avatars/${size.px}/${id}`,
    })
  }

  constructor (props) {
    super(props)

    this._bindMethods([
      '_toggleUploaderDisplay',
      '_handleUploaderComplete',
    ])

    if (!props.src) {
      throw new ReferenceError('props.src is not defined')
    }

    const {
      id,
      type,
      attributes,
    } = props.src

    const size = { ...avatarSize[props.size] }
    const hasAvatar = srcType[type] && attributes && attributes.avatar

    this.state = {
      id,
      size,
      type,
      avatarUrl: hasAvatar ? `/api/${srcType[type]}/${id}/avatar` : `//api.adorable.io/avatars/${size.px}/${id}`,
      displayUploader: false,
    }
  }

  render () {
    const {
      avatarUrl,
      displayUploader,
      id,
      size,
    } = this.state

    const {
      cachedAvatar,
      editable,
      className,
    } = this.props

    const avatar = cachedAvatar || avatarUrl

    return (
      <React.Fragment>
        <div
          aria-label={`${id}'s avatar`}
          className={`avatar ${size.name} ${className}`}
          role="img"
          style={{ backgroundImage: `url(${avatar})` }}>
          {editable && (
            <button className="avatar-edit-overlay" onClick={this._toggleUploaderDisplay}>
              <h4>Edit</h4>
            </button>
          )}
        </div>

        {(editable && displayUploader) && (
          <AvatarUploader
            onComplete={this._handleUploaderComplete}
            onCancel={() => this._toggleUploaderDisplay(false)} />
        )}

      </React.Fragment>
    )
  }
}

Avatar.defaultProps = {
  cachedAvatar: null,
  className: '',
  editable: false,
  size: 'large',
  src: null,
}

Avatar.propTypes = {
  cachedAvatar: PropTypes.string,
  updateAvatar: PropTypes.func.isRequired,
  editable: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(avatarSize)),
  src: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.keys(srcType)).isRequired,
    attributes: PropTypes.shape({
      avatar: PropTypes.bool,
    }),
  }),
}


const mapDispatchToProps = dispatch => bindActionCreators({
  updateAvatar: actions.updateAvatar,
}, dispatch)

const mapStateToProps = (state, ownProps) => {
  if (!ownProps.src) {
    return {
      cachedAvatar: null,
    }
  }

  const {
    id,
    type,
  } = ownProps.src

  let cachedAvatar = null

  if (srcType[type]) {
    cachedAvatar = state.avatars[srcType[type]] && state.avatars[srcType[type]][id]
  }

  return {
    cachedAvatar,
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Avatar)
