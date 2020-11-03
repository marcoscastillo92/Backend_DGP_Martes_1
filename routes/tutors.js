var express = require('express');
var groupsController = require('../controllers/groupController')

var router = express.Router();
router.get('/', async function(req, res, next) {
    res.render('tutor', { title: 'Asociación Vale' });
  });
  

  router.get('/groups', async function(req, res, next) {
    var groupsFromDB = await groupsController.getGroups() 
    res.render('groups', { title: 'Asociación Vale', groups: (groupsFromDB) });
  });

  router.get('/tasks', async function(req, res, next) {
    res.render('tasks', { title: 'Asociación Vale' });
  });

  router.get('/groupDetail', async function(req, res, next) {
    /**PENDIENTE DE SOLUCIONAR */
    console.log(req.params)
    console.log(req.params)
    res.render('groupDetail', { title: 'Asociación Vale', groupId: req.params.grupoId, users:req.params.users});
  });

  module.exports = router;