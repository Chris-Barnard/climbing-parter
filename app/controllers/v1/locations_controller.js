module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const Location = Nodal.require('app/models/location.js');

  class V1LocationsController extends Nodal.Controller {

    index() {

      Location.query()
        .where(this.params.query)
        .end((err, models) => {

          this.respond(err || models);

        });

    }

    show() {

      Location.find(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

    create() {

      this.params.body.data.valid_to = (new Date(new Date().valueOf() + (7 * 24 * 60 * 60 * 1000)));

      Location.create(this.params.body.data, (err, model) => {

        this.respond(err || model);

      });

    }

    update() {

      this.params.body.data.valid_to = (new Date(new Date().valueOf() + (7 * 24 * 60 * 60 * 1000)));

      Location.update(this.params.route.id, this.params.body.data, (err, model) => {

        this.respond(err || model);

      });

    }

    destroy() {

      Location.destroy(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

  }

  return V1LocationsController;

})();
