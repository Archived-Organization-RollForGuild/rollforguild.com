// Module imports
import React from 'react'





// Component imports
// import AbilityScoreChart from '../components/AbilityScoreChart'
import CharacterReview from '../components/CharacterReview'
import Component from '../components/Component'
import Page from '../components/Page'





// Component constants
const title = 'Character'





class Character extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidMount () {
    const {
      getCharacter,
      getRuleset,
      query,
      ruleset,
    } = this.props
    const promises = []

    this.setState({ loading: true })

    promises.push(await getCharacter(query.id))

    if (!ruleset) {
      promises.push(await getRuleset('dnd-5e'))
    }

    await Promise.all(promises)

    this.setState({ loading: false })
  }

  constructor (props) {
    super(props)

    this.state = { loading: true }
  }

  render () {
    const {
      character,
      ruleset,
    } = this.props
    const { loading } = this.state

    return (
      <React.Fragment>
        {loading && (
          <span>Loading...</span>
        )}

        {(!loading && !character) && (
          <span>Character not found. <span aria-label="Sad face emoji" role="img">😞</span></span>
        )}

        {(!loading && character) && (
          <React.Fragment>
            <CharacterReview
              character={character}
              ruleset={ruleset} />

            {/* <AbilityScoreChart
              baseScores={character.abilities}
              loading={loading}
              modifiedScores={character.abilities} /> */}
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['getCharacter', 'getRuleset']

const mapStateToProps = (state, ownProps) => ({
  character: state.characters[ownProps.query.id],
  ruleset: state.rulesets['dnd-5e'],
})





export default Page(Character, title, {
  mapStateToProps,
  mapDispatchToProps,
}, true)
