const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const https = require("https");

const app = express();


require('./api/models/db');
require('./api/config/passport');

const Star = mongoose.model('Star');


app.use(express.static(__dirname + '/dist/stars-and-planets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {

  res.sendFile(path.join(__dirname + '/dist/stars-and-planets/index.html'));
});


app.get('/data', (req, res) => {
  Star.find((error, stars) => {
    if (error) return console.error(err);
    res.send(stars);
  });
});


app.put('/data', (req, res) => {
  const star = new Star(req.body);
  star.save((error, star) => {
    if (error) return console.error(err);
    Star.find((error, stars) => {
      if (error) return console.error(err);
      res.send(stars);
    });
  });
});

app.post('/data', (req, res) => {

  console.log(req);

  Star.findById(req.body.star._id, (error, doc) => {

    if (error) return console.error(err);
    doc.name = req.body.star.name;
    doc.spectralType = req.body.star.spectralType;
    doc.solarMass = req.body.star.solarMass;
    doc.solarRadius = req.body.star.solarRadius;
    doc.effectiveTemperature = req.body.star.effectiveTemperature;
    doc.distance = req.body.star.distance;
    doc.orbitingPlanets = req.body.star.orbitingPlanets;
    doc.save((error, document, affectedCount)=>{
      if (error) return console.error(err);
      Star.find((error, stars) => {
        if (error) return console.error(err);
        res.send(stars);
      });
    });

  });
});

app.delete('/data/:name', (req, res) => {

  Star.deleteOne({name: req.params.name}, (error, mongooseDeleteResult) => {
    if (error) return console.error(err);
    Star.find((error, stars) => {
      if (error) return console.error(err);
      res.send(stars);
    });
  })
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
