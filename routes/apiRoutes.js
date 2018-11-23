

var express = require("express");

var router = express.Router();

var Schedule = require("../models/schedule");

var passport = require('passport');

var jwt = require('jsonwebtoken');

require("../database/passport")(passport);


var User = require("../models/user");




// setup
getToken = function (headers) {
    console.log("got in get schedule !!");

    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
};


router.post("/updateSchedule", passport.authenticate('jwt', { session: false } ),(req,res)=> {

    console.log("got in update schedule!!");

    var token = getToken(req.headers);
    if (token) {
        User.findOne({email:req.body.userEmail},(err,user)=>{
            if(err){
                console.log(err);
            }else{
                /*

                Delete everything from user.schedules, to be sure:

                1) There are not multiplicated elements
                2) If user deleted an event, in this way ,we will delete from DB too

                */

                user.schedules.splice(0,user.schedules.length);

                console.log(user.schedules);

                // add elements from request
                for(var i=0;i<req.body.updateSchedule.length;i++){

                    var data={

                        id:req.body.updateSchedule[i].id,
                        resource: req.body.updateSchedule[i].resource,
                        start: req.body.updateSchedule[i].start,
                        end: req.body.updateSchedule[i].end,
                        text: req.body.updateSchedule[i].text,
                        color: req.body.updateSchedule[i].color,

                    }

                        user.schedules.push(data);
                        console.log(data);

                }
                 user.save();

                   res.json({

                    success: true,
                    message: "Data successfuly saved!"

                });



            }
        });
    }else{

        return res.status(403).send( {success: false, msg: 'Unauthorized.'} );

    }
});

router.post('/getSchedules', passport.authenticate('jwt', { session: false }),(req,res)=> {



    var token = getToken(req.headers);

    if (token) {

        User.findOne({email:req.body.loggedUser},(err, user)=>{

            if(err) {

                console.log(err);

            }else{

                res.json({
                    success: true,
                    userSchedules: user.schedules,
                });

            }

        })
    }else{
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }

})



module.exports = router;
