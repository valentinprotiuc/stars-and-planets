//Install express server
const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();

const uri = 'mongodb://heroku_3h2xwfxr:spmc4d27eot7nc4qmgokqijuvf@ds215633.mlab.com:15633/heroku_3h2xwfxr';
const client = new MongoClient(uri, {useNewUrlParser: true});
const dbName = 'heroku_3h2xwfxr';
var db;

var ObjectID = require('mongodb').ObjectID;

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
  console.log("Server req body: " , req.body);
  console.log("Server req body id: " , req.body._id);
  var data = req.body;
  delete data._id;
  console.log("Object id: ", ObjectID(req.body._id));
  db.collection('stars').updateOne({"name": "Son"}, {$set: JSON.stringify(data)}, (error, result) => {
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
