const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(express.static('build'))
app.use(cors())
/*
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
*/
app.use(express.json())
//app.use(requestLogger)



morgan.token('post', (request, response) => {
  return JSON.stringify(request.body)
})

const morganTiny = morgan(':method :url :status :res[content-length] - :response-time ms :post')
app.use(morganTiny)


let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
  { 
    "id": 5,
    "name": "Mary Poppendieck2", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello Word</h1>')
})

app.get('/api/persons', (request, response, next) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id == id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response, next) => {
  const numberOfPersons = persons.length

  response.send(
    `<div>Phonebook has info for ${numberOfPersons} people</div>
    ${new Date()}
    `
    )
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const newPerson = {
    id: Math.floor(Math.random() * 9999999),
    name: body.name,
    number: body.number
  }

  const foundName = persons.find(person => person.name === newPerson.name)
  if (foundName) {
    return response.status(400).send({
      error: 'name must be uniqueSADADSADSADSADADSADSADSADASDSADSADSASDSADSADSAD'
    })
  }

  persons = persons.concat(newPerson)
  response.json(newPerson)
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})