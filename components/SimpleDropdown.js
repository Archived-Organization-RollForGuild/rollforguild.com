export default (props) => (
  <select
    onChange={props.onChange}
    name={props.name}>
    {props.options.map(option => (
      <option
        key={option}
        value={option}>
        {option}
      </option>
    ))}
  </select>
)
