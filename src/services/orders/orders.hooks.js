const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [],
    find: [
      hook => { console.log('find', hook.params); return hook; }
    ],
    get: [ authenticate('jwt') ],
    create: [
      hook => { console.log('create', hook.params); return hook; }
    ],
    update: [ authenticate('jwt') ],
    patch: [ authenticate('jwt') ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
