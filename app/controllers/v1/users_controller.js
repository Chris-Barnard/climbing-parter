module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const User = Nodal.require('app/models/user.js');
  const UserProfile = Nodal.require('app/models/user_profile.js');
  const AuthController = Nodal.require('app/controllers/auth_controller.js');

  class V1UsersController extends AuthController {

    index() {

      this.authorize((accessToken, user) => {

        UserProfile.query()
          .join('user')
          .where(this.params.query)
          .end((err, models) => {

            this.respond(err || models);

          });
        
      });


    }

    show() {

      User.find(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

    create() {

      // create the new user entry
      User.create(this.params.body.data, (err, newUser) => {

        if (err) { this.respond(err); }
        else {

          // create a corresponding new user profile

          // setup defaults
          var newProfile = {};
          newProfile.flags = {};
          newProfile.user_id = newUser.get('id');
          newProfile.flags.avail_for_search = true;

          // and create new user profile
          UserProfile.create(newProfile, (err, newProfile) => {

            // respond with the newly created user
            this.respond(err || newUser);

          });

        }

      });

    }

    update() {

      User.update(this.params.route.id, this.params.body.data, (err, model) => {

        this.respond(err || model);

      });

    }

    destroy() {

      User.destroy(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

  }

  return V1UsersController;

})();
