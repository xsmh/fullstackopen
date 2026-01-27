import { useEffect, useState } from 'react';
import personService from "./services/persons"
import Notification from "./components/Notification";

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
  return <div>{props.showPersons}</div>
}

const DeleteButton = ({ deletePerson }) => {
  return (
    <button onClick={deletePerson}>delete</button>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notification, setNotification] = useState(null);

  const effect = () => {
    personService.getAll()
      .then(response => {
        setPersons(response);
      })
  }
  useEffect(effect, []);
  const addPerson = (event) => {
    event.preventDefault();
    let newPerson = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }
    const personAlreadyExists = persons.some((person) => person.name === newPerson.name);
    if (personAlreadyExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const targetPerson = persons.filter(person => person.name === newPerson.name);
        newPerson.id = targetPerson[0].id;
        personService.update(newPerson.id, newPerson)
          .then(response => {
            setPersons(persons.map(person => {
              if (person.id === newPerson.id) {
                person = response
              }
              return person
            }))
            setNotification("Number changed!");
            setTimeout(() => {
              setNotification(null)
            }, 3000)
          })
          .catch(error => {
            setNotification(`Info of ${newPerson.name} has already been removed from server.`)
            setTimeout(() => {
              setNotification(null)
            }, 3000)
          })
      }
    } else {
      personService.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response));
          setNewName("");
          setNewNumber("");
          setNotification("New person added!");
          setTimeout(() => {
            setNotification(null)
          }, 3000)
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

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => console.error(error))
    }
  }

  const showPersons = () => {
    const filteredPerson = persons.find((person) => person.name.toLowerCase() === newFilter.toLowerCase());
    if (newFilter !== "" && filteredPerson) {
      return <div>{filteredPerson.name} {filteredPerson.number}</div>
    } else {
      return persons.map((person) => {
        return (
          <div key={person.id}>{person.name} {person.number}
            <DeleteButton deletePerson={() => deletePerson(person.id, person.name)} />
          </div>
        )
      })
    }
  }
  return (
    <div>
      <Notification message={notification} />
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
