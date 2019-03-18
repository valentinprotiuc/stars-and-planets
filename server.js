//Install express server
const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');

const app = express();

const uri = 'mongodb://heroku_3h2xwfxr:spmc4d27eot7nc4qmgokqijuvf@ds215633.mlab.com:15633/heroku_3h2xwfxr';
const client = new MongoClient(uri, {useNewUrlParser: true});
const dbName = 'heroku_3h2xwfxr';
var db;

const myObj = {
  name: "Hello", spectralType: "NONON", solarMass: 1, orbitingPlanets: []
};


// Serve only the static files form the dist directory
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
  db.collection('stars').find({}, {projection: {_id: 0}}).toArray((error, result) => {
    res.send(result);
  });
});


app.post('/save', (req, res) => {
  console.log("This is the request: ", req.body);
  db.collection('stars').insertOne(req.body, (error, result) => {
    if (err) throw err;
    console.log("Doc inserted");
  });
  res.send('OK');
});

/*
client.connect(function (err) {
  assert.equal(err, null);
  console.log('Connected correctly to the server.');

  const db = client.db(dbName);

  findAllDocuments(db, function () {
  })

});

const findAllDocuments = function (db, callback) {
  const collection = db.collection('stars');
  collection.find({}).toArray(function (err, docs) {
    assert.equal(err, null);
    console.log('Records found.');
    console.log(docs);
    callback(docs);
  });
};

const saveDocuments = function (newDoc) {

  client.connect(function (err, db) {

    if (err) throw err;

    const myDb = db.db(dbName);
    const collection = myDb.collection('stars');

    console.log("My Object: ", newDoc);

    collection.insertOne(newDoc, function (err, res) {
      if (err) throw err;
      console.log("Doc inserted");
      client.close();
    })
  })
};
*/


// Start the app by listening on the default Heroku port
//app.listen(process.env.PORT || 8080);
