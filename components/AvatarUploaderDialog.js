// Module Imports
import React from 'react'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'





// Component Imports
import Component from './Component'
import getBase64FromFileInput from '../helpers/getBase64FromFileInput'





export default class AvatarUploaderDialog extends Component {
  constructor(params) {
    super(params)

    this.stages = {
      CHOOSE: 0,
      CROP: 1,
      CONFIRM: 2,
      UPLOAD: 3,
    }

    this._bindMethods([
      'handleFileInputChange',
      'handleChooseSubmit',
      'handleReactCropImageLoad',
      'handleReactCropChange',
      'handleCropSubmit',
      'handleConfirm',
    ])

    this.state = {
      crop: null,
      dragActive: false,
      error: null,
      file: null,
      fileBase64: null,
      fileCropped: null,
      pixelCrop: null,
      stage: this.stages.CHOOSE,
    }
  }

  async handleFileInputChange (event) {
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

  handleChooseSubmit (event) {
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
    } else {
      onCancel()
    }
  }

  handleDrag(dragActive) {
    this.setState({ dragActive })
  }

  handleReactCropImageLoad (image) {
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

  handleReactCropChange(crop, pixelCrop) {
    this.setState({
      crop,
      pixelCrop,
    })
  }

  async handleCropSubmit(event) {
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
      this.setState({
        crop: null,
        file: null,
        fileBase64: null,
        fileCropped: null,
        pixelCrop: null,
        stage: this.stages.CHOOSE,
      })
    }
  }

  async handleConfirm (event) {
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
          error: response,
          stage: this.stages.CHOOSE,
        })
      }
    } else {
      this.setState({
        fileCropped: null,
        stage: this.stages.CROP,
      })
    }
  }

  renderImageChoose () {
    const {
      file,
      dragActive,
    } = this.state

    return (
      <div className="stage image-choose">

        <label
          htmlFor="file"
          className={`dropzone${dragActive ? ' active' : ''}`}>
          {file ? file.name : 'Drop Image here, or click to upload.'}
        </label>

        <input
          type="file"
          id="file"
          name="file"
          onDragEnter={() => this.handleDrag(true)}
          onDragLeave={() => this.handleDrag(false)}
          onDrop={() => this.handleDrag(false)}
          onChange={this.handleFileInputChange} />

        <menu
          className="compact"
          type="toolbar" >

          {this.props.onCancel ? (
            <button
              className="danger"
              name="no"
              onClick={this.handleChooseSubmit}>
              Cancel
            </button>
          ) : (<div className="i-exist-to-put-the-next-button-on-the-right" />)}

          <button
            className="success"
            disabled={!file}
            name="yes"
            onClick={this.handleChooseSubmit}>
            Next
          </button>

        </menu>
      </div>
    )
  }

  renderimageCrop () {
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
          onImageLoaded={this.handleReactCropImageLoad}
          onChange={this.handleReactCropChange}
          crop={crop} />

        <menu
          className="compact"
          type="toolbar" >

          <button
            className="danger"
            name="no"
            onClick={this.handleCropSubmit}>
            Back
          </button>

          <button
            className="success"
            name="yes"
            onClick={this.handleCropSubmit}>
            Next
          </button>

        </menu>
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

        <menu
          className="compact"
          type="toolbar" >

          <button
            className="danger"
            name="no"
            onClick={this.handleConfirm}>
            Back
          </button>

          <button
            className="success"
            name="yes"
            onClick={this.handleConfirm}>
            Upload
          </button>

        </menu>
      </div>
    )
  }

  render() {
    const {
      error,
      stage,
    } = this.state

    return (
      <div className="avatar-uploader">
        <div className="avatar-upload-dialog">
          <h3 className="title">Upload Avatar</h3>

          {Boolean(error) && (
            <div className="error-box">
              {error}
            </div>
          )}

          {stage === this.stages.CHOOSE && this.renderImageChoose()}

          {stage === this.stages.CROP && this.renderimageCrop()}

          {stage === this.stages.CONFIRM && this.renderImageConfirm()}

          {stage === this.stages.UPLOAD && (
            <div className="stage image-upload">
              <h2 className="stage-text">
                Uploading...
              </h2>
            </div>
          )}
        </div>
      </div>
    )
  }
}
