import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }

  ])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const personAlreadyExists = persons.some((person) => person.name === newPerson.name);
    console.log(personAlreadyExists);
    console.log("persons", persons)
    persons.map((person) => console.log(person))
    if (personAlreadyExists) {
      console.log("Person already exists...");
      window.alert(`${newName} already exists`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const showPersons = () => {
    const filteredPerson = persons.find((person) => person === newFilter.toLowerCase());
    console.log(filteredPerson)
    if (newFilter !== "" && filteredPerson) {
      return (<div>{filteredPerson.name} {filteredPerson.number}</div>)
    } else {
      return (persons.map((person) => <div key={person.id}>{person.name} {person.number}</div>))
    }
  }
  return (
    <div>
      <div>debug {newFilter}</div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input
          value={newFilter}
          onChange={handleFilterChange}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />

        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {showPersons}
    </div>
  )
}

export default App
