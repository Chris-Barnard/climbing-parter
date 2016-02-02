module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');

  class AddGearAndPreferredClimbingStyles extends Nodal.Migration {

    constructor(db) {
      super(db);
      this.id = 2016020218080387;
    }

    up() {

      return [
        this.addColumn("user_profiles", "gear", "json"),
        this.addColumn("user_profiles", "preferred_styles", "json")
      ];

    }

    down() {

      return [
        this.dropColumn("user_profiles", "gear"),
        this.dropColumn("user_profiles", "preferred_styles")
      ];

    }

  }

  return AddGearAndPreferredClimbingStyles;

})();
