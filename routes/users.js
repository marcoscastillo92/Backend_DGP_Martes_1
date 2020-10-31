var express = require('express');
const User = require('../models/User');
const Pictogram = require('../models/Pictogram');
var router = express.Router();
var userController = require('../controllers/userController')
var auth = require('../controllers/authController')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  console.log(req.session)
  const newUser = new User({"nombre":"Federico García Lorca","email":"poeta@españa.es","username":"fedegalo27","password":"granada","phoneNumber":"696966969","role":"poeta","token":"dsjgprwk39tgm0rwj2q"});
  await newUser.save();
  
  res.send(newUser);
});

/* GET users listing. */
router.get('/insert-user', async function(req, res, next) {
  //console.log(req.session)
  var textoPictograma = await Pictogram.find({name:"cerdo"})
  let password = "";
  for (let index = 0; index < 6; index++) {
    password += textoPictograma[0].key;
  } 
  console.log(textoPictograma[0]);
  const newUser = new User({"nombre":"Federico García Lorca","email":"poeta@españa.es","username":"fedegalo27","password":password,"phoneNumber":"696966969",
                            "role":"poeta","token":"dsjgprwk39tgm0rwj2q"});
  await newUser.save();
  
  res.send(newUser);
});

/**
 * @api {get} /users/:id
 * @apiName getUser 
 * @apiGroup Get User
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
router.get('/:id', auth, async function(req, res, next) {
  userController.getUserInfoById(req, res);
});

/**
 * @api {post} /users/create
 * @apiName User 
 * @apiGroup Create User
 * @apiParam {String} token         Authorization token from the user that creates a new one
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
 *       "token" : "1aa3cc55d3efb4e5bbae6030443ab9ab612f4a1e28256236b3f2afab409e683017535518465430a9094b78a5eca966d0873ad914bbd60d38d99e24dd4b3c050f"
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
 * @apiError (401) Unauthorized
 * 
 * @apiSampleRequest http://localhost:3000/users/create
 */
router.post('/create', auth, async function(req, res, next) {
  userController.createUser(req, res);
});

/**
 * @api {post} /users/login
 * @apiName userLogin 
 * @apiGroup Login
 * 
 * @apiParam  {String} Username Nombre de usuario.
 * @apiParam  {String} Pasword Contraseña del usuario.
 * 
 * @apiSuccess {String} Result Estado de la petición.
 * @apiSuccess {String} token Users web token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "result": "success",
 *       "token": "15454688fddsf165"
 *     }
 * 
 * @apiError UserNotFound The user was not found.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotRegistred"
 *       "message": "User not registred"
 *     }
 * 
 * @apiError UserLoggedIn User already logged in.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "result": "error"
 *        "message": "You are already logged"
 *     }
 * 
 * @apiSampleRequest http://localhost:3000/users/login
 */

router.post('/login', async (req, res, next) =>{
    if(req.session && req.session.user){
      var response = {result:"error", message:"You are already logged"}
      res.send(response);
    }
    userController.userLogin(req, res);
});


/**
 * @api {post} /users/logout
 * @apiName userLogut 
 * @apiGroup User Logout 
 * 
 * 
 * @apiSuccess {String} Result
 * @apiSuccess {String} Message
 *
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "result": "ok",
 *       "message" : "Logout done correctly"
 *      
 *     }
 * 
 * @apiError User unhautarized.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 * 
 * @apiSampleRequest http://localhost:3000/users/logout
 */

router.post('/logout', auth, (req, res, next) =>{
    req.session.destroy();
    var response = {result:"success", message:"Logout done correctly."}
    res.send(response)
});

module.exports = router;
