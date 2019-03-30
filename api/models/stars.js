const mongoose = require('mongoose');

let planetsSchema = new mongoose.Schema({
  planetName: {
    type: String,
    unique: true,
    required: true
  },
  planetClass: {
    type: String
  },
  planetMass: {
    type: String
  },
  planetRadius: {
    type: String
  },
  planetPeriod: {
    type: String
  },
  planetDistance: {
    type: String
  },
  planetESI: {
    type: String
  },

});

let starsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  spectralType: {
    type: String,
  },
  solarMass: {
    type: Number,
  },
  solarRadius: {
    type: Number,
  },
  effectiveTemperature: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  orbitingPlanets: [planetsSchema]
});

mongoose.model('Star', starsSchema);
