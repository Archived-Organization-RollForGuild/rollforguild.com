// Component imports
import React from 'react'





// Component imports
import Link from '../../components/Link'
import Main from '../../components/Main'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'





// Component constants
const title = 'My Groups'





const MyGroups = () => (
  <React.Fragment>
    <PageHeader>
      <h1>My Groups</h1>
    </PageHeader>

    <Main title={title}>
      <p>It doesn't look like you're a part of any groups. Would you like to <Link category="Groups" label="Search" route="group search"><a>search for groups in your area</a></Link>? Or maybe you should <Link category="My Groups" label="Create New Group" route="group create"><a>start one</a></Link>.</p>
    </Main>
  </React.Fragment>
)





export default Page(MyGroups, title, null, true)
