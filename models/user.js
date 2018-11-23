var mongoose = require("mongoose");

var Schedule = require("../models/schedule");

var bcrypt = require('bcrypt-nodejs');



var userSchema = new mongoose.Schema({
     name: String,
     firstName: String,
     email:{
        type:String,
        unique:true
     } ,
     password: String,
     age: Number,
     schedules: [

     ]
});

// password encryption
userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("User",userSchema);