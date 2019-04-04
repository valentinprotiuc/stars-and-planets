const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const https = require("https");

require('./api/models/db');
require('./api/config/passport');

const routesApi = require('./api/routes/index');
const app = express();

app.use(express.static(__dirname + '/dist/stars-and-planets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', routesApi);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/stars-and-planets/index.html'));
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

app.all('*', function (req, res) {
  res.redirect("https://stars-and-planets.herokuapp.com/");
});


// Die Seite geht in Schlafmodus wenn länger nicht aktiv(Einstellung der Heroku Platform).
// Deswegen dauert das Aufrufen der Seite manchmal bis zu einer Minute.
// Die App macht jede 10 Minuten ein Request, um wach zu bleiben und lange Ladezeit zu vermeiden.
setInterval(() => {
  https.get("https://stars-and-planets.herokuapp.com");
}, 600000);


app.listen(process.env.PORT || 8080);

module.exports = app;
