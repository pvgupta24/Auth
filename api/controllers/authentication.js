var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// module to register the User
module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.faculty = req.body.faculty;
  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    // generate the token
    token = user.generateJwt();
    // send success status 200
    res.status(200);
    res.json({
      "token" : token
    });
  });
};

// module for login of User
module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
  console.log("Local login");
  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      // generate the token
      token = user.generateJwt();
      // send success status 200
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};

module.exports.facebook = function(req, res){
  console.log("Faebook login");
  passport.authenticate('facebook', { 
    scope : ['public_profile', 'email']
  })
};

module.exports.facebookCallback = function(req, res){
  passport.authenticate('facebook', {
    successRedirect : '/home',
    failureRedirect : '/login'
});
};


module.exports.google = function(req, res){
  console.log("Google Login");
  passport.authenticate('google', 
  { scope : ['profile', 'email'] }
  );
}

// the callback after google has authenticated the user
module.exports.googleCallback = function(req, res){
        passport.authenticate('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        });
}