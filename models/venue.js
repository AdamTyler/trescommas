var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var venueSchema = new Schema({
    name: String,
    address: String,
    zip: Number,
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' }
});


var venueModel = mongoose.model("Venue", venueSchema);
module.exports = venueModel;
