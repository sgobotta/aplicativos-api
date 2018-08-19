// Application hooks that run for every service
const logger = require('./hooks/logger');
const { tokenToHeader } = require('./services/utils/authentication');

module.exports = {
  before: {
    all: [ tokenToHeader, logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
