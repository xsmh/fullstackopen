require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'))

app.get("/api/persons", (req, res) => {
  Person.find({}).then(people => {
    res.json(people);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id).then(person => {
    res.json(person);
  });
});

app.get("/info", (req, res) => {
  const message = `Phonebook has info for ${data.length} people`;
  const date = new Date().toString();
  res.send(`${message}<br>${date}`);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing"
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => {
    res.json(savedPerson);
  });
});


app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
})

app.listen(port, () => {
  console.log("Running the server");
})
