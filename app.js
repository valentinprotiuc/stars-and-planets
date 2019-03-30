const express = require('express');
const path = require('path');
//const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
//const https = require("https");

const app = express();

const port = 8080;

//const uri = 'mongodb://heroku_3h2xwfxr:spmc4d27eot7nc4qmgokqijuvf@ds215633.mlab.com:15633/heroku_3h2xwfxr';
//const client = new MongoClient(uri, {useNewUrlParser: true});
const dbName = 'heroku_3h2xwfxr';
let db;

require('./api/models/db');
require('./api/config/passport');

app.use(express.static(__dirname + '/dist/stars-and-planets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


/*client.connect((err, client) => {
  if (err) throw err;
  db = client.db(dbName);
  app.listen(process.env.PORT || 8080);
});*/


app.get('/', function (req, res) {

  res.sendFile(path.join(__dirname + '/dist/stars-and-planets/index.html'));
});

/*
app.get('/data', (req, res) => {
  db.collection('stars').find({}).toArray((error, result) => {
    if (error) throw err;
    res.send(result);
  });
});


app.put('/data', (req, res) => {
  db.collection('stars').insert(req.body, (error, result) => {
    if (error) throw error;
    db.collection('stars').find({}).toArray((error, result) => {
      if (error) throw err;
      res.send(result);
    });
  });
});

app.post('/data', (req, res) => {
  var data = req.body.star;
  delete data._id;
  db.collection('stars').updateOne({"name": req.body.initialName}, {$set: data}, (error, result) => {
      if (error) throw error;
      else console.log(result);
      db.collection('stars').find({}).toArray((error, result) => {
        if (error) throw err;
        res.send(result);
      });
    }
  )
});

app.delete('/data/:name', (req, res) => {
  db.collection('stars').deleteOne({name: req.params.name}, (error, result) => {
    if (error) throw error;
    db.collection('stars').find({}).toArray((error, result) => {
      if (error) throw err;
      res.send(result);
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
*/

app.listen(process.env.PORT || port);
