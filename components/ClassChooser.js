// Module imports
import { connect } from 'react-redux'





// Module imports
import Chooser from '../components/Chooser'





const ClassChooser = (props) => {
  const { ruleset } = props

  return (
    <Chooser
      onChange={props.onChange}
      options={ruleset['player-characters'].classes}
      renderOption={option => option.name}
      value={props.class} />
  )
}





const mapStateToProps = state => ({ ruleset: state.rulesets['dnd-5e'] })





export default connect(mapStateToProps)(ClassChooser)
