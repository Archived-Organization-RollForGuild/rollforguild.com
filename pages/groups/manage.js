// Component imports
import Link from 'next/link'
import React from 'react'





// Component imports
import Page from '../../components/Page'





// Component constants
const title = 'Manage Groups'





const ManageGroups = () => (
  <React.Fragment>
    <header>
      <h1>Manage Your Groups</h1>
    </header>

    <p>It doesn't look like you're a part of any groups. Maybe you should <Link href="/groups/create"><a>start one</a></Link>.</p>
  </React.Fragment>
)





export default Page(ManageGroups, title)
