const Filter = (props) => {
  return(
    <div>
      filter shown with: 
      <input 
        value={props.filterName}
        onChange={props.filterPerson}
      />
    </div>
  )
}

export default Filter