// Module imports
import { connect } from 'react-redux'





// Module imports
import Chooser from '../components/Chooser'





const RaceChooser = (props) => {
  const { ruleset } = props

  return (
    <Chooser
      onChange={props.onChange}
      options={ruleset['player-characters'].races}
      renderOption={option => option.name}
      value={props.race} />
  )
}





const mapStateToProps = state => ({ ruleset: state.rulesets['dnd-5e'] })





export default connect(mapStateToProps)(RaceChooser)
