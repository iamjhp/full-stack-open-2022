const Persons = ({persons, filterName}) => {
  const personsToShow = persons.reduce((filteredPerons, person) => {
    if (person.name.toLowerCase().includes(filterName.toLowerCase())) filteredPerons.push(person)
    return filteredPerons
  }, [])

  return (
    <div>
      {personsToShow.map(person => <p key={person.id}> {person.name} {person.number}</p>)}
    </div>
  )
}

export default Persons