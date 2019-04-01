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
    type: Number,
    default: null
  },
  planetRadius: {
    type: Number,
    default: null
  },
  planetPeriod: {
    type: Number,
    default: null
  },
  planetDistance: {
    type: Number,
    default: null
  },
  planetESI: {
    type: Number,
    default: null
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
    default: null
  },
  solarRadius: {
    type: Number,
    default: null
  },
  effectiveTemperature: {
    type: Number,
    default: null
  },
  distance: {
    type: Number,
    default: null
  },
  orbitingPlanets: [planetsSchema]
});

mongoose.model('Star', starsSchema);
