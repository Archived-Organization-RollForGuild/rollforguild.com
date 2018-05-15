// Module imports
import Clipboard from 'react-clipboard.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'





// Module imports
import Component from './Component'
import Tooltip from './Tooltip'





class ShareableLink extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _onSuccess () {
    this.setState({ successfullyCopied: true })

    setTimeout(() => this.setState({ successfullyCopied: false }), 1500)
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_onSuccess'])

    this.state = { successfullyCopied: false }
  }

  render () {
    const { link } = this.props
    const { successfullyCopied } = this.state

    return (
      <div className="input-group">
        <input
          onBlur={this._deselectLinkText}
          onClick={({ target }) => target.setSelectionRange(0, target.value.length)}
          onFocus={this._selectLinkText}
          readOnly
          value={link} />

        <Clipboard
          className="secondary"
          data-clipboard-text={link}
          onSuccess={this._onSuccess}>
          <React.Fragment>
            <FontAwesomeIcon icon="copy" fixedWidth />

            <Tooltip
              alignment="right"
              attachment="bottom"
              className="fade-in"
              hidden={!successfullyCopied}>
              Copied!
            </Tooltip>
          </React.Fragment>
        </Clipboard>
      </div>
    )
  }
}





ShareableLink.propTypes = { link: PropTypes.string.isRequired }





export default ShareableLink
