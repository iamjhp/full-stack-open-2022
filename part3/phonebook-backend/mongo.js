const mongoose = require('mongoose')
const userInput = process.argv

if (process.argv.length < 3) {
  console.log("Please provide the password as an argument: node mongo.js <password>")
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://admin:${password}@cluster0.ist1y.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema(
  {
    name: String,
    number: String
  },
  {
    collection: 'persons'
  }
)

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(persons => {
    console.log("phonebook:")
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}


if (process.argv.length > 5) {
  console.log("Please provide the password as an argument: node mongo.js <password> <name> <number>")
  process.exit(1)
}
