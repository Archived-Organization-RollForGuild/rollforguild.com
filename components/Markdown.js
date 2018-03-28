// Module imports
import marked from 'marked'
import React from 'react'





const Markdown = ({ input }) => (
  <React.Fragment>
    {/* eslint-disable react/no-danger */}
    <div dangerouslySetInnerHTML={{ __html: marked(input) }} />
    {/* eslint-enable */}
  </React.Fragment>
)





export default Markdown
