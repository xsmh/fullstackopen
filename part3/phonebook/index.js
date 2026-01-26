const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());
let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get("/api/persons", (req, res) => {
  res.send(persons);
})

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
})

app.get("/info", (req, res) => {
  const message = `Phonebook has info for ${data.length} people`;
  const date = new Date().toString();
  res.send(`${message}<br>${date}`);
})

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing"
    })

  }
  if (persons.some(person => person.name === body.name)) {
    return res.status(400).json({
      error: "name must be unique"
    })
  }
  const personId = Math.floor((Math.random() * 100000000000) + 1);;
  const person = {
    name: body.name,
    number: body.number,
    id: String(personId)
  }

  persons = persons.concat(person);
  res.json(person);
})


app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
})

app.listen(port, () => {
  console.log("Running the server");
})
