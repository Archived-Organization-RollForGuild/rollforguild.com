// Module imports
import Chart from 'echarts-for-react'





// Component imports
import Component from '../components/Component'





export default class AbilityScoreChart extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    const { loading } = this.props

    return (
      <Chart
        lazyUpdate
        showLoading={loading}
        notMerge
        option={this.options} />
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
    } = this.props.baseScores

    return {
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
            opacity: 0.25,
          },
        },
        data: [
          {
            areaStyle: {
              normal: {
                color: 'red',
              },
            },
            itemStyle: {
              normal: {
                color: 'red',
              },
            },
            value: [
              strength,
              dexterity,
              intelligence,
              wisdom,
              charisma,
              constitution,
            ],
          },
        ],
        type: 'radar',
      }],
    }
  }
}
