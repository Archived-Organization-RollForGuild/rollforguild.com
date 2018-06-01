// Module imports
import React from 'react'





// Component imports
import Hero from '../components/Hero'
import Main from '../components/Main'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import PageTitle from '../components/PageTitle'





// Component constants
const title = 'Home'





const Index = () => (
  <React.Fragment>
    <PageTitle>{title}</PageTitle>

    <PageHeader>
      <h1>Welcome</h1>
    </PageHeader>

    <Main title={title}>
      <Hero
        size="two-thirds"
        src="/static/images/dice.jpg">
        <img
          alt="blep"
          src="/static/images/logomark.white.full.svg" />
      </Hero>

      <p>Roll For Guild wants to bring people to the RPG table. We aim to build tools to make running campaigns and one shots easier as well as enable people to form, find, and join groups in their local area.</p>

      <p>We're building some simple tools such as campaign and character trackers, session notes, and spell books. However, what we are really excited about are the tools we can't mention yet. Tools that make your GM's life easier and sessions run smoother.</p>

      <p>In addition we want to address the largest barrier to entry and continual play... Finding people to play with. We are building a platform of not only tools, but a way that groups can search for nearby players and players for nearby groups. Gone forever will be the days and weeks of tracking a new group to join or a player to fill an open seat.</p>

      <p>We are Roll For Guild, and we just want to make your RPG experiences the best possible.</p>
    </Main>
  </React.Fragment>
)





export default Page(Index)
