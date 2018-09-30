const { authenticate } = require('@feathersjs/authentication').hooks;
const { populateResponse, updateOrCreateUser, updateIfExists } = require('./../utils/fb.user.hook.utils');


module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ updateOrCreateUser, updateIfExists ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ populateResponse ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
