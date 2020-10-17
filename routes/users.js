var express = require('express');
const User = require('../models/User');
var router = express.Router();
var userService = require('../services/userServices')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const newUser = new User({"nombre":"Federico García Lorca","email":"poeta@españa.es","username":"fedegalo27","password":"granada","phoneNumber":"696966969","role":"poeta","token":"dsjgprwk39tgm0rwj2q"});
  await newUser.save();
  
  res.send(newUser);
});


/**
 * @api {get} /user/:id
 * @apiName getUser 
 * @apiGroup User
 * @apiParam {Number} id Users unique ID.
 * 
 * 
 * @apiSuccess (200) {String} name Nombre del usuario.
 * @apiSuccess (200) {String} email Email del usuario.
 * @apiSuccess (200) {String} username Username del usuario.
 * @apiSuccess (200) {String} password Contraseña del usuario.
 * @apiSuccess (200) {String} phoneNumber Teléfono del usuario.
 * @apiSuccess (200) {String} role Rol del usuario.
 * @apiSuccess (200) {String} token Token del usuario.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "John",
 *       "email": "jhon@gmail.com"
 *       "username": "John",
 *       "password": "Doe",
 *       "phoneNumber": "123456789",
 *       "role": "Tutor"
 *       "token": "asd51wqdas2wqe415"
 *     }
 * 
 * @apiError UserNotFound The id of the User was not found.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 * 
 * @apiSampleRequest http://localhost:3000/users/5f8abca918323947000b712a
 */


router.get('/:id', async function(req, res, next) {
  userService.getUserInfoById(req, res);
});



module.exports = router;
