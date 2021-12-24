const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Thing = require("./models/Thing");

mongoose
  .connect(
    "mongodb+srv://Martinien:Arserom1@cluster0.p5xyi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connexion à mongoDB réussie !");
  })
  .catch(() => {
    console.log("Connexion à mongoDB échouée !");
  });

app.use(express.json()); // Ce middleware nous met à disposition le corps de la requête ( son equivalent c'est bodyParser )

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.post("/api/stuff", (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({ ...req.body });
  thing
    .save()
    .then(() =>
      res.status(201).json({ message: "Objet enregistré avec succès!" })
    )
    .catch((error) => res.status(404).json({ error: error }));
});

app.get("/api/stuff/:id", (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error: error }));
});

app.get("/api/stuff", (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

module.exports = app;
