var request = require('request');
var fs = require('fs');
var mongoose = require('mongoose');
var xmlParser = require('xml2json');
var async = require('async');
var sleep = require('sleep');
var dotenv = require('dotenv');
var cityModel = require('../models/city.js');
var eventModel = require('../models/event.js');
var venueModel = require('../models/venue.js');

dotenv.load({ path: '.env' });
var updatedb = function () {
  var db = mongoose.connect(process.env.MONGODB_URI, function(err) {
    if(err) {
      console.log('mongo connection error', err);
    } else {
      console.log('mongo connection successful');
    }
  });

  var insertCity = function (city) {
    cityModel.findOneAndUpdate(city, city, {upsert:true}, function (err, done) {
      if (err) {
        console.error('city.findOneAndUpdate: ', err);
        return;
      }
      console.log('inserted city ', city.city);
    });
  };

  var insertEvent = function (event) {
    console.log('insert ', event);
    eventModel.findOneAndUpdate(event, event, {upsert:true}, function (err, done) {
      if (err) {
        console.error('event.findOneAndUpdate: ', err);
        return;
      }
      console.log('inserted event ', event.title);
    });
  };

  var insertVenue = function (v) {
  };

  // hard coded cities
  insertCity({"city":"Austin","state":"TX","coordinates":[30.2672,-97.7431]});
  insertCity({"city":"New Braunfels","state":"TX","coordinates":[29.7030,-98.1245]});
  insertCity({"city":"Del Valle","state":"TX","coordinates":[30.2108,-97.6547]});

  // get events
  for (i = 1; i <= 10; i++) {
    var params = [
      'http://api.eventful.com/rest/events/search?app_key=' + process.env.EVENTFUL_API_KEY,
      'location=Austin',
      'date=Future',
      'category=music',
      'page_size=100',
      'sort_order=popularity',
      'page_number='.concat(String(i))
    ];


    request(params.join('&'), function(error, response, body) {
      if (error) {
        console.log('request error: ', error);
        return;
      }
      jsonData = JSON.parse(xmlParser.toJson(body));

      async.each(jsonData.search.events.event, function (jsonEvent, callback) {
        async.waterfall([
          function (callback) {
            var city = jsonEvent.city_name;
            var state = jsonEvent.region_abbr;
            cityModel.find({city: city, state: state}, function (err, result) {
              if (err) {
                console.error('city insert: ', err);
                return;
              }
              callback(null, result[0]);
            });
          },
          function (city, callback) {
            var venue = jsonEvent.venue_name;
            var v = {name: venue, address: "", city: city, zip: 0};
            venueModel.findOneAndUpdate(v, v, {upsert:true}, function (err, vresult) {
              if (err) {
                console.error('venue.findOneAndUpdate: ', err);
                return;
              }
              callback(null, vresult);
            });
          },
          function (venue, callback) {
            var title = jsonEvent.title;
            var description = String(jsonEvent.description);
            var category = null;
            var url = jsonEvent.url;
            var time = jsonEvent.start_time.replace(/ /, 'T');
            var imgurl = jsonEvent.image.url;
            if (jsonEvent.image.medium != null) {
              imgurl = jsonEvent.image.medium.url;
            }
            var artist = null;
            if (Object.keys(jsonEvent.performers).length !== 0) {
              artist = jsonEvent.performers.performer.name;
            }
            if (artist != null) {
              sleep.usleep(250000);
              var spotify_url = [ 'https://api.spotify.com/v1/search?q=', artist, '&type=artist' ];
              request(spotify_url.join(''), function (error, response, body) {
                jsonArtists = JSON.parse(body);
                if (typeof jsonArtists.artists !== 'undefined' && jsonArtists.artists.total > 0) {
                  var tracks_url = ['https://api.spotify.com/v1/artists/',
                                    jsonArtists.artists.items[0].id,
                                    '/top-tracks?country=US'];
                  request(tracks_url.join(''), function (error, response, body) {
                    tracksJson = JSON.parse(body);
                    console.log(tracks_url.join(''));
                    if (typeof tracksJson.tracks !== 'undefined') {
                      console.log(tracksJson.tracks);
                      if (tracksJson.tracks.length > 0) {
                        var previewurl = tracksJson.tracks[0].preview_url;
                        insertEvent({title: title,
                          url: url,
                          time: time,
                          venue: venue,
                          imgurl: imgurl,
                          artist: artist,
                          previewurl: previewurl
                        });
                      }
                    }
                  });
                }
              });
            }
            callback();
          }
        ]);
        callback();
      });
    });
  }
};

if (require.main === module) {
  updatedb();
}

module.exports = updatedb;
