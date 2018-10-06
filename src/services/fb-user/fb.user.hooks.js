const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  createQuery,
  populateResponse,
  updateUserFacebookId,
  updateOrCreateUser,
  updateIfExists,
} = require('./../utils/fb.user.hook.utils');


module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ updateOrCreateUser, updateIfExists ],
    update: [],
    patch: [],
    remove: [ createQuery ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ populateResponse ],
    update: [],
    patch: [],
    remove: [ updateUserFacebookId ]
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
