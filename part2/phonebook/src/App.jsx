import { useEffect, useState } from 'react';
import axios from "axios";

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
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data);
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
