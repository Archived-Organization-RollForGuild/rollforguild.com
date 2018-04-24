// Module Imports
import PropTypes from 'prop-types'
import React from 'react'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'




// Component Imports
import { getBase64FromFileInput } from '../helpers'
import Component from './Component'
import Dialog from './Dialog'



/**
 * Dialog for managing the upload of new avatars.
 * Designed to be used in conjunction with <Avatar />
 *
 * @class AvatarUploaderDialog
 * @extends {Component}
 */
class AvatarUploaderDialog extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleFileInputDrag (dragActive) {
    this.setState({ dragActive })
  }

  async _handleFileInputChange (event) {
    if (event.target.files[0]) {
      const file = event.target.files[0]
      const fileBase64 = await getBase64FromFileInput(file)

      this.setState({
        file,
        fileBase64,
      })
    } else {
      this.setState({
        file: null,
        fileBase64: null,
      })
    }
  }

  _handleFileInputSubmit (event) {
    const {
      name,
    } = event.target

    const {
      onCancel,
    } = this.props

    if (name === 'yes') {
      this.setState({
        error: null,
        stage: this.stages.CROP,
      })
    } else if (typeof onCancel === 'function') {
      onCancel()
    }
  }

  _handleReactCropLoad (image) {
    const aspectRatio = image.width / image.height
    let crop = {
      x: 0,
      y: 0,
      aspect: 1,
    }

    // Calculate initial position for crop window.
    if (aspectRatio > 1) {
      // Where Width > Height
      crop.height = 100
      crop.x = ((image.width - image.height) / 2 / image.width) * 100 // Centers crop window to image.
    } else if (aspectRatio < 1) {
      // Where Width < Height
      crop.width = 100
      crop.y = ((image.height - image.width) / 2 / image.height) * 100 // Centers crop window to image.
    } else {
      // Where Width = Height
      crop.height = 100
    }

    crop = makeAspectCrop(crop, aspectRatio)

    // Set initial pixelCrop from initial crop position.
    // This is required as pixelCrop is not set by ReactCrop until after the user interacts with the image.
    const pixelCrop = {
      x: Math.round(image.naturalWidth * (crop.x / 100)),
      y: Math.round(image.naturalHeight * (crop.y / 100)),
      width: Math.round(image.naturalWidth * (crop.width / 100)),
      height: Math.round(image.naturalHeight * (crop.height / 100)),
    }

    this.setState({
      crop,
      pixelCrop,
    })
  }

  _handleReactCropChange (crop, pixelCrop) {
    this.setState({
      crop,
      pixelCrop,
    })
  }

  async _handleCropSubmit (event) {
    const {
      pixelCrop,
      fileBase64,
    } = this.state

    const {
      name,
    } = event.target

    if (name === 'yes') {
      const imgObj = new Image()
      imgObj.src = fileBase64

      const canvas = document.createElement('canvas')
      canvas.width = pixelCrop.width
      canvas.height = pixelCrop.height

      const ctx = canvas.getContext('2d')

      ctx.drawImage(
        imgObj,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      )

      const fileCropped = await new Promise((resolve, reject) => {
        canvas.toBlob(fileBlob => (fileBlob ? resolve(fileBlob) : reject()), 'image/jpeg')
      })

      this.setState({
        stage: this.stages.CONFIRM,
        fileCropped,
      })
    } else {
      this.setState({ ...this.constructor.initialState })
    }
  }

  async _handleConfirm (event) {
    const {
      name,
    } = event.target

    if (name === 'yes') {
      const {
        onComplete,
      } = this.props

      const {
        file,
        fileCropped,
      } = this.state

      if (!onComplete) {
        throw new ReferenceError('onComplete is not defined, or is not a function.')
      }

      if (typeof onComplete !== 'function') {
        throw new TypeError('onComplete must be a function.')
      }

      this.setState({ stage: this.stages.UPLOAD })

      const response = await onComplete(fileCropped, file)

      if (typeof response === 'string') {
        this.setState({
          ...this.initialState,
          error: response,
        })
        return
      }

      this.setState({ ...this.constructor.initialState })
      return
    }

    this.setState({
      fileCropped: null,
      stage: this.stages.CROP,
    })
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (params) {
    super(params)

    this.stages = {
      INPUT: 0,
      CROP: 1,
      CONFIRM: 2,
      UPLOAD: 3,
    }
    this._bindMethods([
      '_handleFileInputDrag',
      '_handleFileInputChange',
      '_handleFileInputSubmit',
      '_handleReactCropLoad',
      '_handleReactCropChange',
      '_handleCropSubmit',
      '_handleConfirm',
    ])

    this.state = { ...this.constructor.initialState }
  }

  renderImageInput () {
    const {
      file,
      dragActive,
    } = this.state

    return (
      <div className="stage image-input">

        <label
          htmlFor="file"
          className={`dropzone${dragActive ? ' active' : ''}`}>
          {file ? file.name : 'Drop Image here, or click to upload.'}
        </label>

        <input
          type="file"
          id="file"
          name="file"
          onDragEnter={() => this._handleFileInputDrag(true)}
          onDragLeave={() => this._handleFileInputDrag(false)}
          onDrop={() => this._handleFileInputDrag(false)}
          onChange={this._handleFileInputChange} />
      </div>
    )
  }

  renderImageCrop () {
    const {
      crop,
      fileBase64,
    } = this.state

    return (
      <div className="stage image-crop">

        <span className="stage-text">
          Great! Now lets make it fit.
        </span>

        <ReactCrop
          src={fileBase64}
          keepSelection
          onImageLoaded={this._handleReactCropLoad}
          onChange={this._handleReactCropChange}
          crop={crop} />
      </div>
    )
  }

  renderImageConfirm () {
    const {
      fileCropped,
    } = this.state

    return (
      <div className="stage image-confirm">
        <span className="stage-text">
          Does this look okay?
        </span>

        <img
          src={URL.createObjectURL(fileCropped)}
          alt="cropped user avatar" />
      </div>
    )
  }

  render () {
    const {
      error,
      stage,
    } = this.state
    const { onCancel } = this.props

    return (
      <Dialog
        className="avatar-upload-dialog"
        controls={this.controls}
        modal
        onClose={onCancel}
        title="Upload Avatar">
        {Boolean(error) && (
          <div className="error-box">
            {error}
          </div>
        )}

        {stage === this.stages.INPUT && this.renderImageInput()}

        {stage === this.stages.CROP && this.renderImageCrop()}

        {stage === this.stages.CONFIRM && this.renderImageConfirm()}

        {stage === this.stages.UPLOAD && (
          <div className="stage image-upload">
            <h2 className="stage-text">
              Uploading...
            </h2>
          </div>
        )}
      </Dialog>
    )
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get controls () {
    const {
      file,
      stage,
    } = this.state
    const {
      CONFIRM,
      CROP,
    } = this.stages
    const controls = {
      primary: [],
      secondary: [],
    }

    switch (stage) {
      case CROP:
        controls.primary.push((
          <button
            className="success"
            name="yes"
            onClick={this._handleCropSubmit}>
            Next
          </button>
        ))

        controls.secondary.push((
          <button
            className="danger"
            name="no"
            onClick={this._handleCropSubmit}>
            Back
          </button>
        ))

        break

      case CONFIRM:
        controls.primary.push((
          <button
            className="success"
            name="yes"
            onClick={this._handleConfirm}>
            Upload
          </button>
        ))

        controls.secondary.push((
          <button
            className="danger"
            name="no"
            onClick={this._handleConfirm}>
            Back
          </button>
        ))

        break

      default:
        controls.primary.push((
          <button
            className="success"
            disabled={!file}
            name="yes"
            onClick={this._handleFileInputSubmit}>
            Next
          </button>
        ))

        if (this.props.onCancel) {
          controls.secondary.push((
            <button
              className="danger"
              name="no"
              onClick={this._handleFileInputSubmit}>
              Cancel
            </button>
          ))
        }
    }

    return controls
  }

  static get initialState () {
    return {
      crop: null,
      dragActive: false,
      error: null,
      file: null,
      fileBase64: null,
      fileCropped: null,
      pixelCrop: null,
      stage: 0,
    }
  }
}

AvatarUploaderDialog.defaultProps = {
  onComplete: null,
  onCancel: null,
}

AvatarUploaderDialog.propTypes = {
  onComplete: PropTypes.func,
  onCancel: PropTypes.func,
}

export default AvatarUploaderDialog
