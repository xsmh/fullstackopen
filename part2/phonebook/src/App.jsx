import { useEffect, useState } from 'react';
import personService from "./services/persons"

const Filter = (props) => {
  return (
    <div>
      filter shown with <input
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

const Form = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name:
        <input
          value={props.nameValue}
          onChange={props.nameOnChange}
        />
      </div>
      <div>
        number:
        <input
          value={props.numberValue}
          onChange={props.numberOnChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    <div>{props.showPersons}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const effect = () => {
    personService.getAll()
      .then(response => {
        setPersons(response);
      })
  }
  useEffect(effect, []);
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const personAlreadyExists = persons.some((person) => person.name === newPerson.name);
    if (personAlreadyExists) {
      window.alert(`${newName} already exists`);
    } else {
      personService.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response));
          setNewName("");
          setNewNumber("");
        }
        )
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
    const filteredPerson = persons.find((person) => person.name.toLowerCase() === newFilter.toLowerCase());
    if (newFilter !== "" && filteredPerson) {
      return <div>{filteredPerson.name} {filteredPerson.number}</div>
    } else {
      return persons.map((person) => { return (<div key={person.id}>{person.name} {person.number}</div>) })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <Form onSubmit={addPerson} nameValue={newName}
        nameOnChange={handleNameChange} numberValue={newNumber} numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons showPersons={showPersons()} />
    </div>
  )
}

export default App
