// Module imports
import React from 'react'





// Component imports
import Main from '../components/Main'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import PageTitle from '../components/PageTitle'





// Component constants
const title = 'Contact Us'





const Contact = () => (
  <React.Fragment>
    <PageTitle>{title}</PageTitle>

    <PageHeader>
      <h1>{title}</h1>
    </PageHeader>

    <Main title={title}>
      <p>Want to get in touch? Shoot us an email at <a href="mailto:hello@rollforguild.com">hello@rollforguild.com</a>.</p>
    </Main>
  </React.Fragment>
)





export default Page(Contact)
