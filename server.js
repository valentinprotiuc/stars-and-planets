//Install express server
const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const https = require("https");

const app = express();

const uri = 'mongodb://heroku_3h2xwfxr:spmc4d27eot7nc4qmgokqijuvf@ds215633.mlab.com:15633/heroku_3h2xwfxr';
const client = new MongoClient(uri, {useNewUrlParser: true});
const dbName = 'heroku_3h2xwfxr';
var db;

app.use(express.static(__dirname + '/dist/stars-and-planets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

client.connect((err, client) => {
  if (err) throw err;
  db = client.db(dbName);
  app.listen(process.env.PORT || 8080);
});


app.get('/', function (req, res) {

  res.sendFile(path.join(__dirname + '/dist/stars-and-planets/index.html'));
});

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

app.post('/signup', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status("400");
    res.send("Ungültige Eingabe!");
  } else {
    const match = db.collection('users').findOne({email: req.body});
    if (Object.keys(match).length !== 0) {
      res.status("400");
      res.send("Email bereits registriert!");
    } else {
      db.collection('users').insert(req.body, (error, result) => {
        if (error) throw error;
        res.send("Erfolgreich registriert!");
      });
    }
  }
});

app.all('*', function (req, res) {
  res.redirect("https://stars-and-planets.herokuapp.com/");
});

setInterval(() => {
  https.get("https://stars-and-planets.herokuapp.com");
}, 600000);
