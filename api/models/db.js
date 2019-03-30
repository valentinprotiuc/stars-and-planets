const mongoose = require('mongoose');
let gracefulShutdown;
const dbURI = 'mongodb://heroku_3h2xwfxr:spmc4d27eot7nc4qmgokqijuvf@ds215633.mlab.com:15633/heroku_3h2xwfxr';

mongoose.connect(dbURI);

const db = mongoose.connection;

// CONNECTION EVENTS
db.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
db.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
db.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
  db.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app termination', function() {
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS
require('./users');
require('./stars');
