var express = require('express');

var router = express.Router();
router.get('/', async function(req, res, next) {
    res.render('tutor', { title: 'Asociación Vale' });
  });
  

  router.get('/groups', async function(req, res, next) {
    res.render('groups', { title: 'Asociación Vale' });
  });

  router.get('/tasks', async function(req, res, next) {
    res.render('tasks', { title: 'Asociación Vale' });
  });

  module.exports = router;