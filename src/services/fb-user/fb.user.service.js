// Initializes the `users` service on path `/users`
const createService = require('feathers-mongoose');
const createModel = require('../../models/fb.user.model');
const hooks = require('./fb.user.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/fb-user', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('fb-user');

  service.hooks(hooks);
};
