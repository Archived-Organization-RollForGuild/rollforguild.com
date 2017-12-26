// Module imports
import React from 'react'
import Stepzilla from 'react-stepzilla'





// Component imports
import Chooser from '../components/Chooser'
import Component from '../components/Component'
import Page from '../components/Page'





// Component constants
const title = 'Character Builder'





class CharacterBuilder extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_handleChange'])

    this.state = {
      class: null,
      race: null,
    }
  }

  render () {
    const {
      ruleset,
    } = this.props

    return (
      <Stepzilla
        steps={[
          {
            name: 'Choose your race...',
            component: <Chooser
              onChange={(value) => this.setState({ race: value })}
              options={ruleset['player-characters'].races}
              value={this.state.race} />,
          },
          {
            name: 'Choose your class...',
            component: <Chooser
              onChange={(value) => this.setState({ class: value })}
              options={ruleset['player-characters'].classes}
              value={this.state.class} />,
          },
          {
            name: 'Determine your ability scores...',
            component: <div />,
          },
        ]} />
    )
  }
}





const mapStateToDispatch = ['createCharacter']

const mapStateToProps = state => ({ ruleset: state.rulesets['dnd-5e'] })





export default Page(CharacterBuilder, title, {
  mapStateToDispatch,
  mapStateToProps,
})
