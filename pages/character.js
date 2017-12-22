// Module imports
import Chart from 'echarts-for-react'
import React from 'react'





// Component imports
import Component from '../components/Component'
import Page from '../components/Page'





// Component constants
const title = 'Character'





class Character extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidMount () {
    this.setState({ loading: true })
    await this.props.getCharacter(this.props.query.id)
    this.setState({ loading: false })
  }

  constructor (props) {
    super(props)

    this.state = { loading: true }
  }

  render () {
    const { character } = this.props
    const { loading } = this.state

    return (
      <div>
        <header>
          <h2>General Shit</h2>
        </header>

        {loading && (
          <span>Loading...</span>
        )}

        {(!loading && !character) && (
          <span>No character found.</span>
        )}

        {(!loading && character) && (
          <React.Fragment>
            <table>
              <tbody>
                {Object.keys(character).map(property => (
                  <tr key={property}>
                    <th>{property}</th>
                    <td>{character[property]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Chart
              lazyUpdate={false}
              showLoading={loading}
              notMerge={false}
              option={this.options} />
          </React.Fragment>
        )}
      </div>
    )
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  get options () {
    const {
      charisma,
      constitution,
      dexterity,
      intelligence,
      strength,
      wisdom,
    } = this.props.character

    return {
      title: {
        text: 'Ability Scores',
      },
      tooltip: {},
      radar: {
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5],
          },
        },
        indicator: [
          { name: 'Strength', max: 30 },
          { name: 'Dexterity', max: 30 },
          { name: 'Intelligence', max: 30 },
          { name: 'Wisdom', max: 30 },
          { name: 'Charisma', max: 30 },
          { name: 'Constitution', max: 30 },
        ],
      },
      series: [{
        areaStyle: {
          normal: {
            opacity: 0.5,
          },
        },
        data: [{
          value: [
            strength,
            dexterity,
            intelligence,
            wisdom,
            charisma,
            constitution,
          ],
        }],
        itemStyle: {
          normal: {
            color: '#F9713C',
          },
        },
        type: 'radar',
      }],
    }
  }
}





const mapDispatchToProps = ['getCharacter']

const mapStateToProps = state => ({ ...state.character })





export default Page(Character, title, {
  mapStateToProps,
  mapDispatchToProps,
})
