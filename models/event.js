var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: String,
    description: { type: String, default: null },
    category: { type: String, default: null },
    url: String,
    time: Date,
    imgurl: String,
    artist: String,
    previewurl: String,
    venue: { type: mongoose.Schema.Types.ObjectId, ref: "Venue" }
});


var eventModel = mongoose.model("Event", eventSchema);
module.exports = eventModel;
