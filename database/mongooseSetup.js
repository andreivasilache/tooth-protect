var mongoose = require("mongoose");

var app = require("express")();

function mongooseSetup(){

    mongoose.connect('mongodb://gfx96:andrei2001@ds024778.mlab.com:24778/toothprotect',{ useNewUrlParser: true },function(err, db) {
        if (err) {
            console.log('Unable to connect to the server. Please start the server. Error:', err);
        } else {
            console.log('Connected to Server successfully!');
        }
    });

}

module.exports = mongooseSetup;