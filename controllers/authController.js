var User = require('../models/User');

var auth = async function(req, res, next) {
  var token;
  if(req.body)
    token = req.body.token;
  else
    token = req.query.token;

  if (token && token != ""){
    var user = await User.findOne({ token: req.body.token });
    if (user && user.username != ""){
      return next();
    }
  }
  return res.sendStatus(401);
};

module.exports = auth;