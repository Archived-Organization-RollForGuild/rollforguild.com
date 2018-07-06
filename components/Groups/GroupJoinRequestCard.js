// Component Imports
import Avatar from '../Avatar'
import Button from '../Button'
import Component from '../Component'
import Link from '../Link'
import Markdown from '../Markdown'


class JoinRequestCard extends Component {
  /***************************************************************************\
    Properties
  \***************************************************************************/

  state = {
    accepting: false,
    ignoring: false,
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _accept = async () => {
    const {
      accept,
      user,
    } = this.props

    this.setState({ accepting: true })

    await accept(user.id)

    setTimeout(() => this.setState({ accepting: false }), 500)
  }

  _ignore = async () => {
    const {
      ignore,
      user,
    } = this.props

    this.setState({ ignoring: true })

    await ignore(user.id)

    setTimeout(() => this.setState({ ignoring: false }), 500)
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    const { user } = this.props
    const {
      accepting,
      ignoring,
    } = this.state

    const {
      bio,
      email,
      username,
    } = user.attributes

    return (
      <div className="card">
        <header>
          <Avatar src={user} size="small" />

          <h2>{username}</h2>
        </header>

        <div className="content">
          {!!bio && (
            <Markdown input={bio} />
          )}

          {!bio && (
            <em>No bio available</em>
          )}
        </div>

        <footer>
          <menu
            className="compact"
            type="toolbar">
            <div className="primary">
              <Link href={`mailto:${email}`}>
                <a className="button small success">Message</a>
              </Link>
            </div>

            <div className="secondary">
              <Button
                action="accept"
                category="Groups"
                className="small success"
                disabled={accepting || ignoring}
                label="Membership"
                onClick={this._accept}>
                {!accepting ? 'Accept' : 'Accepting...'}
              </Button>

              <Button
                action="ignore"
                category="Groups"
                className="small danger"
                disabled={accepting || ignoring}
                label="Membership"
                onClick={this._ignore}>
                {!ignoring ? 'Ignore' : 'Ignoring...'}
              </Button>
            </div>
          </menu>
        </footer>
      </div>
    )
  }
}

export default JoinRequestCard
