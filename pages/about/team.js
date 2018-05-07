// Module imports
import React from 'react'





// Component imports
import wordpressService from '../../services/wordpress'
import Component from '../../components/Component'
import Main from '../../components/Main'
import Markdown from '../../components/Markdown'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import PageTitle from '../../components/PageTitle'





// Component constants
const title = 'Meet the Team'





class Team extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  static async getInitialProps (/*{ query, store }*/) {
    const response = await wordpressService.get('/wp-json/wp/v2/users')

    return { team: response.data }
  }

  render () {
    const { team } = this.props

    return (
      <React.Fragment>
        <PageTitle>{title}</PageTitle>

        <PageHeader>
          <h1>{title}</h1>
        </PageHeader>

        <Main title={title}>
          <ul className="card-list">
            {team.map(teamMember => {
              const {
                acf,
                description,
                id,
                name,
              } = teamMember

              return (
                <li className="card" key={id}>
                  <header>
                    <div
                      aria-label={`${name}'s avatar`}
                      className="avatar small"
                      style={{ backgroundImage: `url(${teamMember.avatar_urls['96']})` }} />

                    <h2>{name}</h2>

                    <aside>
                      <small>{acf.rfg_title}</small>
                    </aside>
                  </header>

                  <Markdown
                    className="content"
                    input={description} />
                </li>
              )
            })}
          </ul>
        </Main>
      </React.Fragment>
    )
  }
}





export default Page(Team)
