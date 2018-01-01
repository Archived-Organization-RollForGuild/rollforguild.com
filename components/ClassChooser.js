// Component imports
import Chooser from '../components/Chooser'





const ClassChooser = (props) => {
  const {
    character,
    ruleset,
  } = props
  const { classes } = ruleset['player-characters']

  return (
    <Chooser
      onChange={props.onChange}
      options={Object.keys(classes).map(item => ({
        ...classes[item],
        value: item,
      }))}
      renderOption={option => option.name}
      returnValue={option => option.value}
      value={character.class} />
  )
}





export default ClassChooser
