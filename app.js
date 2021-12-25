const express = require("express");
const app = express();
const mongoose = require("mongoose");
const stuffRoutes = require("./routes/stuffRoutes");


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

app.use("/api/stuff", stuffRoutes);

module.exports = app;
