module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const UserProfile = Nodal.require('app/models/user_profile.js');
  const Location = Nodal.require('app/models/location.js');
  const AuthController = Nodal.require('app/controllers/auth_controller.js');

  class V1UserProfilesController extends AuthController {

    index() {

      UserProfile.query()
        .where(this.params.query)
        .end((err, models) => {

          this.respond(err || models);

        });

    }

    show() {

      var distanceToTarget;

      // custom function to compare locations
      this.authorize((accessToken, user) => {

        UserProfile.find(this.params.route.id, (err, targetProfile) => {

          if (err) { this.respond(err); }
          if (!targetProfile) { this.respond(new Error('No matching user profile at id : ' + this.params.route.id)); }

          UserProfile.query()
            .join('location')
            .where( { user_id : user.get('id') } )
            .end((err, myProfiles) => {

              if (err) { this.respond(err); }
              if (!myProfiles) { this.respond(new Error('No matching user profile for user_id : ' + user.get('id'))); }

              Location.queryDistance(myProfiles[0].get('current_location'), targetProfile.get('current_location'), (err, result) => {

                if (err) { this.respond(err); };

                // convert results into JSON object
                let resultObject = JSON.parse(result);

                if (resultObject.status === 'ZERO_RESULTS') {

                  distanceToTarget = null;

                }

                if (resultObject.status === 'OK') {

                  distanceToTarget = resultObject.routes[0].legs[0].distance.text;

                }

                // convert targetProfile model into a basic object
                let targetProfileObject = targetProfile._data;
                targetProfileObject.distance_to_me = distanceToTarget;

                this.respond(err || targetProfileObject);

              });

              // this.respond(err || models);

            });

        });

      });

    }

    create() {

      UserProfile.create(this.params.body.data, (err, model) => {

        this.respond(err || model);

      });

    }

    update() {

      UserProfile.update(this.params.route.id, this.params.body.data, (err, model) => {

        this.respond(err || model);

      });

    }

    destroy() {

      UserProfile.destroy(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

  }

  return V1UserProfilesController;

})();
