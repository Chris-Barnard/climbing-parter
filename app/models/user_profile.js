module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');

  const User = Nodal.require('app/models/user.js');

  class UserProfile extends Nodal.Model {}

  UserProfile.setDatabase(Nodal.require('db/main.js'));
  UserProfile.setSchema(Nodal.my.Schema.models.UserProfile);

  UserProfile.joinsTo(User);
  UserProfile.validates('user_id', 'Must have a valid user_id field', v => v && v > 0);

  return UserProfile;

})();
