const mongoose = require('mongoose');
let gracefulShutdown;
const dbURI = process.env.MONGODB_URI; // Definiert in der Heroku-Umgebung

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
