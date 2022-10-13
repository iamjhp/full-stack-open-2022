const InputField = (props) => (
  <div>
    {props.label}:
    <input
      type="text"
      value={props.value}
      name={props.name}
      onChange={(props.onChange)}
      id={props.id}
    />
  </div>
)

export default InputField