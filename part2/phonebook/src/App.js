import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    personService
      .getAllPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNubmerChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    const personAlreadyExists = persons.some(person => person.name === newName) ? true : false
    
    if (personAlreadyExists) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)){
        // Person is already in the phonebook
        const foundedPerson = persons.find(person => person.name === newPerson.name)

        personService
          .updatePerson(foundedPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newPerson.name ? person : returnedPerson))
          })
      }
    } else {
      personService
        .createNewPerson(newPerson)
        .then(returendPerson => {
          setPersons(persons.concat(returendPerson))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = event => {
    const id = parseInt(event.target.id)
    const toDeletePerson = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${toDeletePerson.name} ?`)) {
      personService
      .deletePerson(id)
      .then(returnedPerson => {
       setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        alert( `the person '${toDeletePerson.name}' doesn't exist`)
      })
    }
  }

  const filterPerson = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} filterPerson={filterPerson}/>
      <h3>Add a new</h3>
      <PersonForm persons={persons} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNubmerChange={handleNubmerChange} addPerson={addPerson}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filterName={filterName} deletePerson={deletePerson}/>
    </div>
  )
}

export default App