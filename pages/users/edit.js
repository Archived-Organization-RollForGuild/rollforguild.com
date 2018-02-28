// Module imports
import React from 'react'




// Component imports
import Component from '../../components/Component'
import AvatarUploader from '../../components/AvatarUploaderDialog'
import Page from '../../components/Page'





// Component constants
const title = 'Edit Profile'





class UserEditor extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidMount () {
    const {
      getUser,
      userId,
    } = this.props
    let {
      user,
    } = this.props

    if (!user && userId) {
      const response = await getUser(userId)
      if (response.status === 'success') {
        user = response.payload.data
      }
    }

    this.setState({
      avatarSrc: user.attributes.avatar ? `/api/users/${user.id}/avatar?${user.attributes.avatar}` : `//api.adorable.io/avatars/500/${encodeURIComponent(user.id)}`,
      user,
      loaded: true,
    })
  }

  constructor (props) {
    super(props)

    this._bindMethods([
      'handleAvatarUploaderComplete',
      'handleEditSubmit',
      'toggleEditor',
      'updateUserAttribute',
      'updatePasswordAttribute',
    ])

    this.state = {
      avatarSrc: null,
      dirtyFields: {},
      error: null,
      editors: {},
      loaded: false,
      submitting: false,
      user: null,
      passwordAttributes: {
        current_password: '',
        password: '',
      },
    }
  }

  async handleAvatarUploaderComplete (_fileBlob) {
    const {
      updateUserAvatar,
    } = this.props

    const {
      user,
    } = this.state

    const fileBlob = _fileBlob

    fileBlob.name = `${user.id}-avatar`

    const response = await updateUserAvatar(user.id, fileBlob)

    if (response.status !== 'success') {
      return 'File Upload Error. Please Try again.'
    }

    this.setState({
      avatarSrc: URL.createObjectURL(fileBlob),
      editors: {
        ...this.state.editors,
        avatar: false,
      },
    })
    return null
  }
  async handleEditSubmit(event) {
    event.preventDefault()

    const {
      user,
      dirtyFields,
      passwordAttributes,
    } = this.state

    const {
      updateUser,
      updateUserPassword,
    } = this.props

    this.setState({
      submitting: true,
      error: null,
    })

    let result = null
    let newUser = null

    if (Object.keys(dirtyFields).length) {
      result = await updateUser(user.id, dirtyFields)

      if (result.status === 'success') {
        newUser = result.payload.data
      } else {
        this.setState({
          error: 'Error while updating your profile. Note: If you also changed your password, your password has NOT been changed.',
        })
        return
      }
    }

    if (passwordAttributes.current_password.length && passwordAttributes.password.length) {
      result = await updateUserPassword(user.id, passwordAttributes)

      if (result.status === 'success') {
        newUser = result.payload.data
      } else {
        let errorMessage = 'Error while attempting to change your password.'

        if (result.payload && result.payload.errors && result.payload.errors[0] && result.payload.errors[0].detail) {
          errorMessage = result.payload.errors[0].detail
        }

        this.setState({
          error: errorMessage,
          passwordAttributes: {
            current_password: '',
            password: '',
          },
        })
        return
      }
    }

    if (result) {
      this.setState({
        dirtyFields: {},
        editors: {},
        passwordAttributes: {
          current_password: '',
          password: '',
        },
        submitting: false,
        user: newUser || user,
      })
    }
  }

  updateUserAttribute (attribute, newValue) {
    const {
      user,
      dirtyFields,
    } = this.state

    if (!user || !user.attributes) {
      return // Just in case.
    }

    const origValue = user.attributes[attribute]
    const curValue = dirtyFields[attribute]

    const newDirtyFields = { ...dirtyFields }


    if (typeof newDirtyFields[attribute] !== 'undefined' && newValue === origValue) {
      delete newDirtyFields[attribute]
    } else if (typeof origValue !== 'undefined' && newValue !== origValue && newValue !== curValue) {
      newDirtyFields[attribute] = newValue
    } else {
      return
    }

    this.setState({ dirtyFields: newDirtyFields })
  }

  toggleEditor(event, editorName, isActive) {
    if (event) {
      event.preventDefault()
    }

    this.setState({
      editors: {
        ...this.state.editors,
        [editorName]: typeof isActive === 'boolean' ? isActive : !this.state.editors[editorName],
      },
    })
  }

  updatePasswordAttribute(attribute, newValue) {
    this.setState({
      passwordAttributes: {
        ...this.state.passwordAttributes,
        [attribute]: newValue,
      },
    })
  }

  renderUserEditor () {
    const {
      dirtyFields,
      editors,
      user,
      submitting,
      avatarSrc,
      passwordAttributes,
    } = this.state

    const {
      username,
    } = user.attributes



    /*  Email editor to be put in after API supports new email change method.
      < label htmlFor = "email" > New Email:</label>
        <input
          disabled={submitting}
          id="email"
          name="email"
          type="email"
          onChange={event => this.updateUserAttribute('email', event.target.value)}
          value={getAttributeDisplayValue('email') || ''} />
    */


    const getAttributeDisplayValue = attribute => (typeof dirtyFields[attribute] !== 'undefined' ? dirtyFields[attribute] : user.attributes[attribute])

    return (
      <div className="page-content">
        <div className="user-details">
          <div className="user-details-card">
            <button className="user-image-wrapper" onClick={(event) => this.toggleEditor(event, 'avatar', true)}>
              <img
                className="user-image wrapped"
                src={avatarSrc}
                alt="User Avatar" />
              <div className="user-image-edit-overlay">
                <span>Edit</span>
              </div>
            </button>

            <div className="user-name">
              <h4>{username}</h4>
            </div>
          </div>
        </div>
        <div className="profile-section user-bio">
          <h4>Your Bio</h4>
          { editors.bio ? (
            <div className="section-content">
              <textarea
                disabled={submitting}
                id="bio"
                name="bio"
                onChange={event => this.updateUserAttribute('bio', event.target.value)}
                value={getAttributeDisplayValue('bio') || ''} />
            </div>
          ) : (
            <div
              className="section-content editor-toggle"
              role="button"
              tabIndex={0}
              onClick={event => this.toggleEditor(event, 'bio', true)}
              onKeyDown={event => this.toggleEditor(event, 'bio', true)}>
              {getAttributeDisplayValue('bio') || 'You haven\'t filled in your backstory yet!'}
            </div>
          )}
        </div>
        <div className="profile-section user-email">
          <h4>E-Mail</h4>
          { editors.email ? (
            <div className="section-content editor email-editor">
              <span>Sorry, you cannot change your email (yet!)</span>
            </div>
          ) : (
            <div
              className="section-content editor-toggle"
              role="button"
              tabIndex={0}
              onClick={event => this.toggleEditor(event, 'email', true)}
              onKeyDown={event => this.toggleEditor(event, 'email', true)}>
              {getAttributeDisplayValue('email')}
            </div>
          )}
        </div>
        <div className="profile-section user-password">
          <h4>Password</h4>
          {editors.password ? (
            <div className="section-content editor password-editor">

              <label htmlFor="currentPassword">
                Current Password:
              </label>

              <input
                disabled={submitting}
                id="currentPassword"
                name="currentPassword"
                type="password"
                onChange={event => this.updatePasswordAttribute('current_password', event.target.value)}
                value={passwordAttributes.current_password || ''} />

              <label htmlFor="password">
                New Password:
              </label>

              <input
                disabled={submitting}
                id="password"
                name="password"
                type="password"
                onChange={event => this.updatePasswordAttribute('password', event.target.value)}
                value={passwordAttributes.password || ''} />
            </div>
          ) : (
            <div
              className="section-content editor-toggle"
              role="button"
              tabIndex={0}
              onClick={event => this.toggleEditor(event, 'password', true)}
              onKeyDown={event => this.toggleEditor(event, 'password', true)}>
              Password: ******************
            </div>
            )}
        </div>
        <div className="save-button">
          <button
            className="button success save-button"
            disabled={!submitting && !this.isValidSubmitState()}
            onClick={this.handleEditSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    )
  }

  isValidSubmitState() {
    const {
      dirtyFields,
      passwordAttributes,
    } = this.state

    const adjustedDirtyFields = { ...dirtyFields }

    let result = true

    if (Object.keys(dirtyFields).length) {
      if (dirtyFields.email && !dirtyFields.email.length) {
        result = false
      }
    }

    if (passwordAttributes.current_password.length || passwordAttributes.password.length) {
      if (passwordAttributes.current_password.length && passwordAttributes.password.length) {
        adjustedDirtyFields.password = true
      } else {
        result = false
      }
    }

    if (!Object.keys(adjustedDirtyFields).length) {
      result = false
    }

    return result
  }

  render () {
    const {
      editors,
      error,
      loaded,
      user,
    } = this.state

    return (
      <React.Fragment>

        <header>
          <h1>{title}</h1>
        </header>

        {!loaded && (
          <p>Loading...</p>
        )}

        {(loaded && !user) && (
          <p>Log in to edit your profile!</p>
        )}

        {typeof error === 'string' && (
          <p>{error}</p>
        )}

        {(loaded && user) && this.renderUserEditor() }


        {editors.avatar && (
          <React.Fragment>
            <div className="dialog-backer" />
            <AvatarUploader
              onComplete={this.handleAvatarUploaderComplete}
              onCancel={() => this.toggleEditor(null, 'avatar', false)} />
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['getUser', 'updateUser', 'updateUserAvatar', 'updateUserPassword']





const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.userId] || null,
  userId: ownProps.userId || null,
})





export default Page(UserEditor, title, {
  mapDispatchToProps,
  mapStateToProps,
})
