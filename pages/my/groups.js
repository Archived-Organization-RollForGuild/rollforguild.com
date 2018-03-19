// Component imports
import React from 'react'





// Component imports
import Link from '../../components/Link'
import Page from '../../components/Page'





// Component constants
const title = 'My Groups'





const MyGroups = () => (
  <React.Fragment>
    <header>
      <h1>My Groups</h1>
    </header>

    <p>It doesn't look like you're a part of any groups. Would you like to <Link category="Groups" label="Search" route="group search"><a>search for groups in your area</a></Link>? Or maybe you should <Link category="My Groups" label="Create New Group" route="group create"><a>start one</a></Link>.</p>
  </React.Fragment>
)





export default Page(MyGroups, title, null, true)
