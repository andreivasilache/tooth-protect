var mongoose = require("mongoose");


var scheduleSchema =new mongoose.Schema({
     id: String,
     resource: String,
     start: String,
     end: String,
     text: String,
     color: String,
});

module.exports = mongoose.model("Schedule",scheduleSchema);