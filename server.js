//Install express server
const express = require('express');
const path = require('path');
const mongodb = require('mongodb');

const app = express();

let uri = 'mongodb://heroku_3h2xwfxr:spmc4d27eot7nc4qmgokqijuvf@ds215633.mlab.com:15633/heroku_3h2xwfxr';

let seedData;

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/stars-and-planets'));

app.get('/*', function (req, res) {

  res.sendFile(path.join(__dirname + '/dist/stars-and-planets/index.html'));
});

mongodb.MongoClient.connect(uri, function (err, client) {

  if (err) throw err;

  let db = client.db('starsdb');

  let stars = db.collection('stars');

  console.log(stars);

});


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
