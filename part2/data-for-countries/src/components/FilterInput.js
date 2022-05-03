const FilterInput = (props) => {
  return (
    <form>
      <div>
      find countries
        <input vale={props.country} onChange={props.handleFilterInputChange}/>
      </div>
      
    </form>
  )
}

export default FilterInput