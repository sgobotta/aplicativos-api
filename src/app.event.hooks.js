const Hooks = require('./hooks/event-hooks');
const loadFixturesJob = require('./lib/fixtures');

module.exports = function (app) {

  if (!process.env.SKIP_FIXTURES) {
    Hooks.add('beforeCoreInit', loadFixturesJob(app));
  }
};
