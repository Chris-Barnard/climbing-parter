module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');
  const UserProfile = Nodal.require('app/models/user_profile.js');

  class AddFlagTask extends Nodal.Task {

    exec(app, args, callback) {

      console.log('AddFlag task executed');

      // Experimenting with the task class to try adding some additional flags to my user_profile model

      UserProfile.query()
      	.end((err, models) => {

          // Iterate through each model setting up the new flags while keeping existing ones set
          models.forEach(model => {

            var curFlags = model.get('flags');
            // var newFlags = curFlags;
            var newFlags = { 
              avail_for_search : true,
              lead_climber : true,
              willing_to_guide : true,            
            }

            model.set('flags', newFlags);
            model._changed.flags = true;

          });

          models.saveAll((err, result) => {

            if (err) { console.log('Error occured saving updated models: ' + err); };

            callback();

          });
          
        });

    }

  }

  return AddFlagTask;

})();
