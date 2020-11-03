var express = require('express');
const Pictogram = require('../models/Pictogram');
const Group = require('../models/Group');
var router = express.Router();
const uuidv4 = require('uuid/v4');

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Asociación Vale' });
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

router.post('/insert-groups', async function(req, res, next){
  var newGroup = new Group({"name":"grupo1", "memberCount":"50", "category":"ROL", "users":"pepe, david, maría"})
  await newGroup.save()

  newGroup = new Group({"name":"grupo2", "memberCount":"10", "category":"ROL", "users":"pepe, david, maría"})
  await newGroup.save()

  newGroup = new Group({"name":"grupo3", "memberCount":"30", "category":"ROL", "users":"pepe, david, maría"})
  await newGroup.save()

  newGroup = new Group({"name":"grupo4", "memberCount":"40", "category":"ROL", "users":"pepe, david, maría"})
  await newGroup.save()

  newGroup = new Group({"name":"grupo5", "memberCount":"20", "category":"ROL", "users":"pepe, david, maría"})
  await newGroup.save()

  newGroup = new Group({"name":"grupo1", "memberCount":"90", "category":"ROL", "users":"pepe, david, maría"})
  await newGroup.save()
  
  res.send("Grupos introducidos")
});

router.get('/get-groups', async function(req, res, next){
  var groups = await Group.find()
  
  res.send(groups)
});

/* GET Get Pictograms */
router.get('/get-pictograms', async function(req, res, next) {
  //console.log(req.session)
  var pictograms = await Pictogram.find({ section: "login" })
  res.send(pictograms);
});

module.exports = router;
