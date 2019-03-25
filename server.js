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


app.post('/save', (req, res) => {
  console.log("This is the request: ", req.body);
  db.collection('stars').insertOne(req.body, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

app.post('/remove', (req, res) => {
  const myquery = {name: req.body};
  db.collection('stars').deleteOne(myquery, (error, result) => {
    if (error) throw error;
    res.send(result);
  })
});

app.all('*', function (req, res) {
  res.redirect("https://stars-and-planets.herokuapp.com/");
});
