var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

cityModel = require("../models/city");
venueModel = require("../models/venue");
eventModel = require("../models/event");

router.get('/data', function(req, res, next) {
  var data = [
    {id: 1, author: "Adam Tyler", text: "This app rocks"},
    {id: 2, author: "Andy Fields", text: "Hell yes it does"}
  ];
  res.send(data);
});

// Get info for a city
// router.get('/city', function(req, res, next) {
//   console.log(req.query);
//   //search for city info in DB, use mongoose
//   //respond with data
//   var data = {id: 1, name: "Austin", State: "TX", zip: "78745"};
//     // {id: 2, name: "San Marcos", State: "TX", zip: "12345"}
//   // ];
//   res.send(data);
// });

// Get all events for a city based on city search and date
router.get('/events/:name/:state/:date', function(req, res, next) {
  // input is city and date
  //console.log(req.params);
  //search for city info in DB, use mongoose
  //respond with data
  eventModel.find({"time": {"$gte": new Date(2016, 4, 20), "$lt": new Date(2016, 4, 23)}})
    .populate("venue")
    .exec(function (err, results) {
      if (err) {
        console.error("eventModel find: ", err);
        res.send({});
        return;
      }
      var output = {}
      var events = []
      //var event = {}
      for (i = 0; i < results.length; i++) {
        var event = new Object();
        event.id = results[i]._id;
        event.name = results[i].title;
        event.desc = results[i].description;
        event.time = results[i].time.toDateString();
        event.imgurl = results[i].imgurl;
        if (results[i].venue == null)
          event.venue = null;
        else
          event.venue = results[i].venue.name;
        events.push(event);
        //console.log(event);
      }
      output = {
        city: {id: 1, name: "Austin", state: "TX", zip: "78745"},
        events: events
      };
      res.send(output);
    });
});

router.get('/event/:id', function (req, res, next) {
  //console.log(req.params.id);
  eventModel.findById(req.params.id)
    //.populate("venue")
    .populate({
      path: "venue",
      populate: {
        path: "city",
        model: "City"
      }
    })
    .exec(function (err, result) {
      if (err) {
        console.error("eventModel findOne: ", err);
        res.send({});
        return;
      }
      if (result == null) {
        res.status(404).send("<html><body><h1>404</h1><p>Event ID not found</p></body></html>");
        return;
      }
      //console.log(result);
      var event = new Object();
      event.id = result._id;
      event.name = result.title;
      event.desc = result.desc;
      event.time = result.time.toDateString();
      event.imgurl = result.imgurl;
      if (result.venue == null) {
        event.venue = null;
        event.city = null;
        event.state = null;
      } else {
        event.venue = result.venue.name;
        if (result.venue.city == null) {
          event.city = null;
          event.state = null;
        } else {
          event.city = result.venue.city.city;
          event.state = result.venue.city.state;
        }
      }
      event.url = result.url;
      event.artist = result.artist;
      event.previewurl = result.previewurl;
      res.send(event);
    });
});

module.exports = router;
