/**
 * @function skipFeathersInternalCall
 * @summary Given a context checks wheter the call is a request or a feathers
 * intenal call.
 * @param {Object} context A before hook context.
 * @returns {Object} A before hook context.
 */
const skipFeathersInternalCall = (context) => {
  if(!context.params.provider) {
    return context;
  }
};

function sortByCreationDate(context) {
  context.params.query.$sort = { createdAt: -1 };
  return context;
}

function projectAuthors(context) {
  context.params.query.$populate = 'author';
  return context;
}

function filterData(context) {
  skipFeathersInternalCall(context);
  const orders = context.result.map((order) => {
    return {
      id: order._id,
      isActive: order.isActive,
      title: order.title,
      creationDate: order.createdAt,
      author: {
        id: order.author._id,
        username: order.author.username
      }
    };
  });
  context.params.query = {};
  context.result = orders;
  return context;
}

function filterRemovedData(context) {
  skipFeathersInternalCall(context);
  const order = context.result;
  context.result = {
    id: order._id
  };
  return context;
}

module.exports = {
  before: {
    all: [],
    find: [
      sortByCreationDate,
      projectAuthors
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
    ],
    find: [
      filterData
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [ filterRemovedData ]
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
