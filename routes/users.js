var express = require('express');
const User = require('../models/User');
var router = express.Router();
var userController = require('../controllers/userController')

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
  userController.getUserInfoById(req, res);
});

/**
 * @api {post} /users/create
 * @apiName CreateUser 
 * @apiGroup User
 * @apiParam {String} name          Users name.
 * @apiParam {String} username      Users username ID.
 * @apiParam {String} password      Users password.
 * @apiParam {Date}   [birthDate]   Optional. Users birthdate.
 * @apiParam {String} [email]       Optional. Users email.
 * @apiParam {String} [phoneNumber] Optional. Users phone number.
 * @apiParam {String} role          Users role.
 * 
 * @apiParamExample {json} Request-Example:
 *   {
 *       "username" : "nickname",
 *       "name" : "Nombre_Usuario",
 *       "password" : "test",
 *       "role" : "Tutor",
 *   }
 * 
 * 
 * @apiSuccess (200) {Object} user Created object user with his _id.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "_id": "5f8affc231fe1db68a86997c",
 *         "name": "Nombre_Usuario",
 *         "username": "nickname",
 *         "password": "test",
 *         "role": "Tutor",
 *         "createdAt": "2020-10-17T14:29:22.109Z"
 *     }
 * 
 * @apiError MissingFields/ExtraFields The mandatory fields that are missing or not valid extra fields.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "error": "Missing Fields",
 *       "missing_fields": "['name','username','password','role']"
 *     }
 * 
 * @apiSampleRequest http://localhost:3000/users/create
 */
router.post('/create', async function(req, res, next) {
  userController.createUser(req, res);
});

module.exports = router;
