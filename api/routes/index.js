const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
//Aus Sicherheitsgründen ist die Variable SESSION_SECRET in der Heroku-Umgebung definiert
const auth = jwt({
  secret: process.env.SESSION_SECRET,
  userProperty: 'payload'
});

const ctrlProfile = require('../controllers/profile');
const ctrlAuth = require('../controllers/authentication');
const ctrlData = require('../controller/data');


// Profil
router.get('/profile', auth, ctrlProfile.profileRead);

// Authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// Hinzufügen, Löschen, Aktualisieren, Finden

router.get('/getData', ctrlData.get);
router.post('/addData', ctrlData.add);
router.get('/updateData', ctrlData.update);
router.get('/removeData', ctrlData.remove);

module.exports = router;
