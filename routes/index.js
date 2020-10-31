var express = require('express');
const Pictogram = require('../models/Pictogram');
var router = express.Router();
const uuidv4 = require('uuid/v4');

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'API Asociación Vale' });
});

/* GET Insert Pictograms */
router.get('/insert-pictograms', async function(req, res, next) {
  //console.log(req.session)
  console.log(req.session)
  var newPictogram = new Pictogram({"name":"cerdo","key": uuidv4() ,"section":"login"});
  await newPictogram.save();

  newPictogram = new Pictogram({"name":"perro","key": uuidv4(),"section":"login"});
  await newPictogram.save();

  newPictogram = new Pictogram({"name":"gato","key": uuidv4(),"section":"login"});
  await newPictogram.save();

  newPictogram = new Pictogram({"name":"delfin","key": uuidv4(),"section":"login"});
  await newPictogram.save();

  newPictogram = new Pictogram({"name":"leon","key": uuidv4(),"section":"login"});
  await newPictogram.save();

  newPictogram = new Pictogram({"name":"caballo","key": uuidv4(),"section":"login"});
  await newPictogram.save();

});

/* GET Get Pictograms */
router.get('/get-pictograms', async function(req, res, next) {
  //console.log(req.session)
  var pictograms = await Pictogram.find({ section: "login" })
  res.send(pictograms);
});

module.exports = router;
