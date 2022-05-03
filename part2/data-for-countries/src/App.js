import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import FilterInput from './components/FilterInput'

function App() {
  const [newCountry, setNewCountry] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [filteredCountries, setFilteredCountries] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setNewCountry(response.data)
    })
  }, [])

  useEffect(() => {
    const foundedCountries = newCountry.filter(country => 
      country.name.common.toLowerCase().includes(searchInput.toLowerCase())
    )
    setFilteredCountries(foundedCountries)
  }, [newCountry, searchInput])

  const handleFilterInputChange = (event) => {
    setSearchInput(event.target.value)
  }

  const handleClick = (event) => {
    console.log(event.target.id)
    setSearchInput(event.target.id)
  }

  return (
    <div>
      <FilterInput input={searchInput} handleFilterInputChange={handleFilterInputChange}/>
      <Countries countries={filteredCountries} handleClick={handleClick}/>
    </div>
  );
}

export default App;
