import Country from './Country'
import Weather from './Weather'

const Countries = ({countries, handleClick}) => {

  if (countries.length > 10) {
    return (
      <p>
        Too many matches, specify another filter
      </p>
    )
  }

  if (countries.length > 1){
    return (
      <div>
         {countries.map(country => 
          <p key={country.area}>
            {country.name.common}
            <button id={country.name.common} onClick={handleClick}>
              show
            </button>
          </p>
        )}
      </div>
    )
  }
  
  if (countries.length === 1) {
    return (
      <div>
        <Country country={countries} />
        <Weather capital={countries[0].capital[0]} />
      </div>
    )
  }
  return (
    <div>
    </div>
  )
}

export default Countries