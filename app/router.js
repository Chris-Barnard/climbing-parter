module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const router = new Nodal.Router();

  const IndexController = Nodal.require('app/controllers/index_controller.js');
  const StaticController = Nodal.require('app/controllers/static_controller.js');
  const Error404Controller = Nodal.require('app/controllers/error/404_controller.js');

  /* generator: begin imports */

  const V1UsersController = Nodal.require('app/controllers/v1/users_controller.js');
  const V1AccessTokensController = Nodal.require('app/controllers/v1/access_tokens_controller.js');
  const V1UserProfilesController = Nodal.require('app/controllers/v1/user_profiles_controller.js');
  const V1LocationsController = Nodal.require('app/controllers/v1/locations_controller.js');

  /* generator: end imports */

  router.route('/', IndexController);
  router.route('/static/*', StaticController);

  /* generator: begin routes */

  router.route('/v1/users/:id', V1UsersController);
  router.route('/v1/access_tokens/:id', V1AccessTokensController);
  router.route('/v1/user_profiles/:id', V1UserProfilesController);
  router.route('/v1/locations/:id', V1LocationsController);

  /* generator: end routes */

  router.route(/.*/, Error404Controller);

  return router;

})();
