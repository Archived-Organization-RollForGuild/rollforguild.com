// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'





// Component imports
import Button from './Button'
import Component from './Component'
import EditorHelpDialog from './EditorHelpDialog'





class MarkdownHelpButton extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this.state = { showDialog: false }
  }

  render () {
    const { showDialog } = this.state
    const { category } = this.props

    return (
      <React.Fragment>
        <Button
          category={category}
          className="inline link"
          data-t="markdown-help:button"
          label="Markdown Help"
          onClick={() => this.setState({ showDialog: true })}>
          <FontAwesomeIcon fixedWidth icon="pencil-alt" /> Styling with Markdown is supported
        </Button>

        {showDialog && (
          <EditorHelpDialog
            data-t="markdown-help:dialog"
            onClose={() => this.setState({ showDialog: false })} />
        )}
      </React.Fragment>
    )
  }
}





MarkdownHelpButton.propTypes = { category: PropTypes.string.isRequired }





export default MarkdownHelpButton
