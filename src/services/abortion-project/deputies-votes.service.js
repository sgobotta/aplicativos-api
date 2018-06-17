/**
 * @module DeputiesVotesService
 */
const createService = require('feathers-mongoose');
const createModel = require('../../models/deputies-votes.model');
const hooks = require('./deputies-votes.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    Model
  };

  // Initialize our service with any options it requires
  app.use('/votes', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('votes');

  service.hooks(hooks);
};
