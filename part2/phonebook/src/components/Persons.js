const Persons = ({persons, filterName, deletePerson}) => {
  const personsToShow = persons.reduce((filteredPerons, person) => {
    if (person.name.toLowerCase().includes(filterName.toLowerCase())) filteredPerons.push(person)
    return filteredPerons
  }, [])

  return (
    <div>
      {personsToShow.map(person => 
        <p key={person.id}> 
          {person.name} {person.number}
          <button id={person.id} onClick={deletePerson}>delete</button>
        </p>
      )}
    </div>
  )
}

export default Persons