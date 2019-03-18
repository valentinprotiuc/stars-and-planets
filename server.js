//Install express server
const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');

const app = express();

const uri = 'mongodb://heroku_3h2xwfxr:spmc4d27eot7nc4qmgokqijuvf@ds215633.mlab.com:15633/heroku_3h2xwfxr';

const dbName = 'heroku_3h2xwfxr';


const client = new MongoClient(uri, { useNewUrlParser: true });

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/stars-and-planets'));

app.use(bodyParser.json());

app.get('/*', function (req, res) {

  res.sendFile(path.join(__dirname + '/dist/stars-and-planets/index.html'));
});

app.post('/save', function (req, res) {

  saveDocuments(req.body);
  console.log("The Body: ", req.body);
  res.send('Saved to db.');
  
});

client.connect(function (err) {
  assert.equal(err, null);
  console.log('Connected correctly to the server.');

  const db = client.db(dbName);

  findAllDocuments(db, function () {
    client.close();
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

const saveDocuments = function (newDoc){

  client.connect(function (err) {

    if (err) throw err;

    const db = client.db(dbName);
    const collection = db.collection('stars');

    collection.insertOne(newDoc, function (err, res) {
      if (err) throw err;
      console.log("Doc inserted");
      client.close();
    })
  })
};


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
