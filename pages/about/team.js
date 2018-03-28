// Module imports
import React from 'react'





// Component imports
import wordpressService from '../../services/wordpress'
import Component from '../../components/Component'
import Markdown from '../../components/Markdown'
import Page from '../../components/Page'





// Component constants
const title = 'Team'





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
        <header>
          <h1>Meet the Team</h1>
        </header>

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

                <Markdown input={description} />
              </li>
            )
          })}
        </ul>
      </React.Fragment>
    )
  }
}





export default Page(Team, title)
