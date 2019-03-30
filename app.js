const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const https = require("https");
const ObjectId = require('mongodb').ObjectID;

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

  Star.findById(req.body.id, (error, doc)=>{
    if (error) return console.error(err);
    doc.name = req.body.star.name;
    doc.spectralType = req.body.star.spectralType;
    doc.solarMass = req.body.star.solarMass;
    doc.solarRadius = req.body.star.solarRadius;
    doc.effectiveTemperature = req.body.star.effectiveTemperature;
    doc.distance = req.body.star.distance;
    doc.orbitingPlanets = req.body.star.orbitingPlanets;
    doc.save();

    Star.find((error, stars) => {
      if (error) return console.error(err);
      res.send(stars);
    });
  });


 /* let data = req.body.star;
  delete data._id;*/

  //const doc = await Star.findOne({_id: ObjectId(req.body.star._id)});
 /* console.log("The id: ", req.body.id);
  console.log("The id: ", req.body.star._id);
  console.log("The star: ", req.body.star);
  Star.findById(req.body.id, (error, doc)=>{
    console.log("The doc: ", doc);
  });*/
  /*
    doc.name = req.body.star.name;
    doc.spectralType = req.body.star.spectralType;
    doc.solarMass = req.body.star.solarMass;
    doc.solarRadius = req.body.star.solarRadius;
    doc.effectiveTemperature = req.body.star.effectiveTemperature;
    doc.name = req.body.star.name;
    doc.name = req.body.star.name;
  */
  /*Star.findOneAndUpdate({name: initialName}, data, (error, doc) => {
    console.log(doc);
    if (error) return console.error(err);
    Star.find((error, stars) => {
      if (error) return console.error(err);
      res.send(stars);
    });
  });
  /* Star.where({name: req.body.star.name}).update(data).exec();
   Star.find((error, stars) => {
      if (error) return console.error(err);
      res.send(stars);
    });*/


 /* Star.replaceOne({_id: ObjectId(req.body.star._id)}, data, {upsert: true}, (err, rawResponse) => {
      if (error) return console.error(err);
      console.log(rawResponse);
      Star.find((error, stars) => {
        if (error) return console.error(err);
        res.send(stars);
      });
    });*/
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
