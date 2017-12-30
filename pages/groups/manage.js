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
      <h1>Manage Groups!</h1>
    </header>

    <p>Often, the hardest part of playing tabletop games is <em>finding people to play with</em>. If you haven't read it yet, make sure to check out our <Link href="/about/mission"><a>mission statement</a></Link>. The <em>entire idea</em> is to build tools that bring more people to the gaming table.</p>
    <p>With our group finding and management tools, we'll make it easy for you to find and network with other players near you.</p>
  </React.Fragment>
)





export default Page(ManageGroups, title)
