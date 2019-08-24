// Module imports
import React from 'react'




// Component imports
// import Hero from '../components/Hero'
import Main from '../components/Main'
import PageDescription from '../components/PageDescription'
import PageHeader from '../components/PageHeader'
import PageTitle from '../components/PageTitle'





const Home = () => (
  <React.Fragment>
    <PageTitle>Home</PageTitle>

    <PageDescription>This is the home page!</PageDescription>

    <PageHeader>
      <h1>Roll For Guild</h1>
    </PageHeader>

    <Main
      className="wordpress-proxy"
      title="Home">
      {/* {Boolean(page.featured_media) && (
        <Hero
          gravity={page.featured_media.gravity}
          src={page.featured_media.url} />
      )} */}

      <p>Roll For Guild wants to bring people to the RPG table. We aim to build tools to make running campaigns and one shots easier as well as enable people to form, find, and join groups in their local area.</p>

      <p>We’re building some simple tools such as campaign and character trackers, session notes, and spell books. However, what we are really excited about are the tools we can’t mention yet. Tools that make your GM’s life easier and sessions run smoother.</p>

      <p>In addition we want to address the largest barrier to entry and continual play… Finding people to play with. We are building a platform of not only tools, but a way that groups can search for nearby players and players for nearby groups. Gone forever will be the days and weeks of tracking a new group to join or a player to fill an open seat.</p>

      <p>We are Roll For Guild, and we just want to make your RPG experiences the best possible.</p>
    </Main>
  </React.Fragment>
)





export default Home
