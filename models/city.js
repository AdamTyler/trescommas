var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var citySchema = new Schema({
    city: String,
    state: String,
    coordinates: [Number]
});


var cityModel = mongoose.model("City", citySchema);
module.exports = cityModel;
