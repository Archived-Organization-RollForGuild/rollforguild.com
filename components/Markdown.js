// Module imports
import marked from 'marked'
import React from 'react'





class Markdown extends React.Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    return (
      <React.Fragment>
        {/* eslint-disable react/no-danger */}
        <div {...this.renderProps} />
        {/* eslint-enable */}
      </React.Fragment>
    )
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get renderProps () {
    const { input } = this.props
    const renderProps = { ...this.props }

    delete renderProps.input

    renderProps.dangerouslySetInnerHTML = { __html: marked(input) }

    return renderProps
  }
}





export default Markdown
