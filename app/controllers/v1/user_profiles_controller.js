module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const UserProfile = Nodal.require('app/models/user_profile.js');

  class V1UserProfilesController extends Nodal.Controller {

    index() {

      UserProfile.query()
        .where(this.params.query)
        .end((err, models) => {

          this.respond(err || models);

        });

    }

    show() {

      UserProfile.find(this.params.route.id, (err, model) => {

        this.respond(err || model);

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
