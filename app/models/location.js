module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const Request = require('request');

  class Location extends Nodal.Model {

  	static queryDistance(startId, endId, callback) {

      var queryURL = 'https://maps.googleapis.com/maps/api/directions/json?origin={startLat},{startLong}&destination={endLat},{endLong}&key={googleMapsAPIKey}';
      // unsure if this should be this.find() or Location.find()
      Location.find(startId, (err, startLocation) => {
        
        Location.find(endId, (err, endLocation) => {

          var url = queryURL
            .replace('{startLat}', startLocation.get('latitude'))
            .replace('{startLong}', startLocation.get('longitude'))
            .replace('{endLat}', endLocation.get('latitude'))
            .replace('{endLong}', endLocation.get('longitude'))
            .replace('{googleMapsAPIKey}', Nodal.my.Config.secrets.auth.googleMapsAPIKey);

          // console.log(url);

          Request.get(url, (err, response, body) => {

            if (err) {

              return callback(new Error('Unable to connect to google maps api'));

            }

            if (response.statusCode !== 200) {

              return callback(new Error('Invalid status code returned : ' + response.statusCode));

            }

            // console.log(body);

            return callback(null, body);

          });

        });
      
      });

  	}

  }

  Location.setDatabase(Nodal.require('db/main.js'));
  Location.setSchema(Nodal.my.Schema.models.Location);

  return Location;

})();
