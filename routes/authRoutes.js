var express = require("express");
var router = express.Router();

var User = require("../models/user.js");

var jwt = require('jsonwebtoken');


var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secret';
    opts.issuer = 'accounts.examplesoft.com';
    opts.audience = 'yoursite.net';



router.post("/register",(req,res)=>{
    if (!req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
      } else {
        var newUser = new User({
            name: req.body.name,
            firstName: req.body.firstName,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            schedules: [ ]
        });

        // save the user
        newUser.save(function(err) {
          if (err) {
            return res.status(401).send({success: false, msg: 'Email already exists.'});
          }else{
                res.json({
                    success: true,
                    msg: 'Successful created new user.'
                } );
          }
        });
      }

});

router.post("/login", (req,res) =>{
    User.findOne({
        email: req.body.email
      }, function(err, user) {
            if (err) throw err;

            if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {

                // if user is found and password is right create a token
                var token = jwt.sign(
                    user.toJSON(),
                    '#ILovePugs',
                   { expiresIn : 60 * 24 }  // 24h

                );

                var sendToken = 'JWT ' + token;

                // return the information including token as JSON
                res.json({
                    success: true,
                    currentUser: {user},
                    token: 'JWT ' + token
                });

                } else {
                    res.status(401).send({
                        success: false,
                        msg: 'Authentication failed. Wrong password.'
                    });
                }
            });
            }
        });

});

router.post("/logout",(req,res) =>{
});

module.exports = router;