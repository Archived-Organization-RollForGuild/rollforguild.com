// Module Imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'





// Component Imports
import { actions } from '../store'
import AvatarUploader from './AvatarUploaderDialog'
import Component from './Component'





class Avatar extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _toggleUploaderDisplay(show) {
    this.setState({ displayUploader: typeof show === 'boolean' ? show : !this.state.showAvatarEdit })
  }

  async _handleUploaderComplete(_fileBlob) {
    const {
      updateAvatar,
    } = this.props

    const {
      id,
      type,
    } = this.state

    const fileBlob = _fileBlob

    fileBlob.name = `${type}-${id}-avatar`

    const { status } = await updateAvatar(type, id, fileBlob)

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

  componentWillReceiveProps(nextProps) {
    if (!nextProps.src) {
      throw new ReferenceError('props.src is not defined')
    }

    const {
      id,
      type,
      attributes,
    } = nextProps.src

    const size = this.size[nextProps.size] ? { ...this.size[nextProps.size] } : { ...this.size.large }
    const hasAvatar = this.type[type] && attributes && attributes.avatar

    this.setState({
      id,
      type,
      size,
      avatarUrl: hasAvatar ? `/api/${type}/${id}/avatar` : `//api.adorable.io/avatars/${size.px}/${id}`,
    })
  }

  constructor(props) {
    super(props)

    this.type = {
      users: 'users',
      groups: 'groups',
    }

    this.size = {
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

    const size = this.size[props.size] ? { ...this.size[props.size] } : { ...this.size.large }
    const hasAvatar = this.type[type] && attributes && attributes.avatar

    this.state = {
      id,
      size,
      type,
      avatarUrl: hasAvatar ? `/api/${type}/${id}/avatar` : `//api.adorable.io/avatars/${size.px}/${id}`,
      displayUploader: false,
    }
  }

  render() {
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
          className={`avatar ${size.name}${className ? ` ${className}` : ''}`}
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


const mapDispatchToProps = dispatch => ({
  updateAvatar: bindActionCreators(actions.updateAvatar, dispatch),
})

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

  return {
    cachedAvatar: state.avatars[type] && state.avatars[type][id],
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Avatar)
