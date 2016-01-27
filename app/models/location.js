module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');

  class Location extends Nodal.Model {}

  Location.setDatabase(Nodal.require('db/main.js'));
  Location.setSchema(Nodal.my.Schema.models.Location);

  return Location;

})();
