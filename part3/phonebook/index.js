require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((people) => {
      res.json(people);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      res.json(person);
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  const message = `Phonebook has info for ${data.length} people`;
  const date = new Date().toString();
  res.send(`${message}<br>${date}`);
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

const errorHandler = (error, res, req, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformed id" });
  }

  next(error);
};
app.use(errorHandler);

app.listen(port, () => {
  console.log("Running the server");
});
