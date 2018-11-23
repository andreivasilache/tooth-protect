// ============  Requests  ===========

var     express = require("express"),
        app = express(),
        mongoose = require("mongoose"),
        path  = require("path"),
        cors  = require("cors"),
        bodyParser  = require("body-parser");

 //======================================

// ============  APP SETUP ===========

app.use(cors());  // angular - node comunication


app.use(function(req, res, next) {
    // cors setup
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// mongoose setup
var mongooseSetup = require("./database/mongooseSetup")();

// Body parser setup
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: false}));

 app.use(express.static(__dirname + '/dist/tooth-protect'));

// ===========================================




//  ============ LOCAL REFERENCES ===========

// models

var User     = require("./models/user.js");
var Schedule = require("./models/schedule.js");

// routes

var authRoutes = require("./routes/authRoutes.js");
var api        = require("./routes/apiRoutes.js");



app.use('/api',api);
app.use('/auth',authRoutes);

app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname + '/dist/tooth-protect/index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });



app.listen(process.env.PORT || 8080,()=>{
    console.log("Server started!");
});