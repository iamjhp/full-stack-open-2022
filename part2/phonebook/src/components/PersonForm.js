const Input = (props) => {
  return(
    <div>
      {props.name}
      <input 
        value={props.value}
        onChange={props.onChange}
      />
    </div>
    
  )
}

const PersonForm = (props) => {
  return (
    <form>
      <Input name="name:" value={props.newName} onChange={props.handleNameChange}/>
      <Input name="number:" value={props.newNumber} onChange={props.handleNubmerChange}/>
      <div>
        <button onClick={props.addPerson} type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm