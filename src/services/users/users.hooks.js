const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

function filterUnassignedAttributes(context) {
  const { data } = context;
  const keys = Object.keys(data);
  keys.forEach((key) => {
    if (!data[key]) {
      delete data[key];
    }
  });
  return context;
}

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword() ],
    update: [ hashPassword(),  authenticate('jwt') ],
    patch: [
      hashPassword(),
      authenticate('jwt'),
      filterUnassignedAttributes
    ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [
      protect('password')
    ],
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
