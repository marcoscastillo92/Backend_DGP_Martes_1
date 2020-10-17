var express = require('express');
const User = require('../models/User');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log("AQUI");
  const nuevo = new User();
  await nuevo.save();
  res.render('index', { title: 'Express' });
});

module.exports = router;
