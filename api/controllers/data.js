const mongoose = require('mongoose');
const Star = mongoose.model('Star');


module.exports.add = (req, res) => {

  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {
    const star = new Star(req.body.noIdStar);

    star.save((error, star) => {
      if (error) return console.error(err);
      Star.find((error, stars) => {
        if (error) return console.error(err);
        res.send(stars);
      });
    });
  }

};

module.exports.get = (req, res) => {
  Star.find((error, stars) => {
    if (error) return console.error(err);
    res.send(stars);
  });
};

module.exports.update = (req, res) => {

  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {
    Star.findById(req.body.star._id, (error, doc) => {

      if (error) return console.error(err);
      // should check if any found
      doc.name = req.body.star.name;
      doc.spectralType = req.body.star.spectralType;
      doc.solarMass = req.body.star.solarMass;
      doc.solarRadius = req.body.star.solarRadius;
      doc.effectiveTemperature = req.body.star.effectiveTemperature;
      doc.distance = req.body.star.distance;
      doc.orbitingPlanets = req.body.star.orbitingPlanets;
      doc.save((error, document, affectedCount) => {
        if (error) return console.error(err);
        Star.find((error, stars) => {
          if (error) return console.error(err);
          res.send(stars);
        });
      });

    });
  }
};

module.exports.remove = (req, res) => {

  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {
    Star.deleteOne({_id: mongoose.Types.ObjectId(req.body.star._id)}, (error, mongooseDeleteResult) => {
      if (error) return console.error(err);
      Star.find((error, stars) => {
        if (error) return console.error(err);
        res.send(stars);
      });
    })
  }
};


