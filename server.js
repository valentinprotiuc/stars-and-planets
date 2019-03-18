//Install express server
const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();

const uri = 'mongodb://heroku_3h2xwfxr:spmc4d27eot7nc4qmgokqijuvf@ds215633.mlab.com:15633/heroku_3h2xwfxr';

const dbName = 'heroku_3h2xwfxr';


const client = new MongoClient(uri);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/stars-and-planets'));

app.get('/*', function (req, res) {

  res.sendFile(path.join(__dirname + '/dist/stars-and-planets/index.html'));
});

client.connect(function (err) {
  assert.equal(err, null);
  console.log('Connected correctly to the server.');

  const db = client.db(dbName);

  findAllDocuments(db, function () {
    client.close();
  })

});

/*mongodb.MongoClient.connect(uri, function (err, client) {

  if (err) throw err;

  let db = client.db('starsdb');

  let stars = db.collection('stars');

  console.log(stars);

});*/

const findAllDocuments = function (db, callback) {
  const collection = db.collection('stars');
  collection.find({}).toArray(function (err, docs) {
    assert.equal(err, null);
    console.log('Records found.');
    console.log(docs);
    callback(docs);
  });
};


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
