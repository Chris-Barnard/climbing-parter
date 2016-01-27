module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');

  class CreateLocation extends Nodal.Migration {

    constructor(db) {
      super(db);
      this.id = 2016012715550036;
    }

    up() {

      return [
        this.createTable("locations", [
          {"name":"source","type":"string"},
          {"name":"valid_to","type":"datetime"},
          {"name":"latitude","type":"float"},
          {"name":"longitude","type":"float"}
        ])
      ];

    }

    down() {

      return [
        this.dropTable("locations")
      ];

    }

  }

  return CreateLocation;

})();
