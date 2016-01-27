module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');

  class CreateUserProfile extends Nodal.Migration {

    constructor(db) {
      super(db);
      this.id = 2016012715481809;
    }

    up() {

      return [
        this.createTable("user_profiles", [
          {"name":"user_id", "type":"int"},
          {"name":"name","type":"string"},
          {"name":"picture_url","type":"string"},
          {"name":"flags","type":"json"},
          {"name":"current_location","type":"int"}
        ])
      ];

    }

    down() {

      return [
        this.dropTable("user_profiles")
      ];

    }

  }

  return CreateUserProfile;

})();
