// Module imports
import React from 'react'





// Component imports
import Page from '../components/Page'





// Component constants
const title = 'Contact Us'





const Contact = () => (
  <React.Fragment>
    <header>
      <h1>{title}</h1>
    </header>

    <p>Want to get in touch? Shoot us an email at <a href="mailto:hello@rollforguild.com">hello@rollforguild.com</a>.</p>
  </React.Fragment>
)





export default Page(Contact, title)
