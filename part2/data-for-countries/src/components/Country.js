const Country = ({country}) => {
  return(
    <div>
      <h1>
        {country[0].name.common}
      </h1>
      <div>
        <p>
          capital: {country[0].capital[0]}
        </p>
        <p>
          area: {country[0].area}
        </p>
      </div>
      <h1>
        languages:
      </h1>
      <ul>
        {Object.keys(country[0].languages).map(lang =>
          <li key={lang}>
            {country[0].languages[lang]}
          </li>
        )}
      </ul>
      <img src={country[0].flags.png} />
    </div>
  )
}

export default Country