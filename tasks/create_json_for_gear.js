module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');
  const UserProfile = Nodal.require('app/models/user_profile.js');

  class CreateJsonForGearTask extends Nodal.Task {

    exec(app, args, callback) {

      console.log('CreateJsonForGear task executed');
      
      // query all user_profiles without any gear data
      // this syntax isn't working for some reason as it returns no results even on first
      // run following initial migration .where( { gear : null } )
      UserProfile.query()
        // .where( { gear : null } )
        .end((err, models) => {

          // for each model in the array of results
          models.forEach(model => {

            // setup the required object structure as a new variable
            var newGear = {
              crashpad : true,
              harness : true,
              rope : false,
              quickdraws : false,
              trad_gear : false
            }

            // and set this object as the gear object in our model
            model.set('gear', newGear);

            // flag this property as changed *** Is this necessary?? ***
            model._changed.gear = true;

          });

          models.saveAll((err, result) => {

            if (err) { console.log('An error occurred saving the models to the database'); };

            callback();

          });

        });

    }

  }

  return CreateJsonForGearTask;

})();
