module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');
  const UserProfile = Nodal.require('app/models/user_profile.js');

  class CreateJsonForPreferredStyleTask extends Nodal.Task {

    exec(app, args, callback) {

      console.log('CreateJsonForPreferredStyle task executed');

      UserProfile.query()
        .end((err, models) => {

          models.forEach(model => {

            var newPreferredStyle = {
              bouldering : true,
              sport : false,
              top_rope : true,
              ice : false,
              mountaineering : true
            }

            model.set('preferred_styles', newPreferredStyle);

          });

          models.saveAll((err, result) => {

            if (err) { console.log('Error saving models into database'); };

            callback();

          });

        });

    }

  }

  return CreateJsonForPreferredStyleTask;

})();
