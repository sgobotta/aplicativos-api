/**
 * @function skipFeathersInternalCall
 * @summary Given a context checks wheter the call is a request or a feathers
 * intenal call.
 * @param {Object} context A before hook context.
 * @returns {Object} A before hook context.
 */

const { authenticate } = require('@feathersjs/authentication').hooks;

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
      },
      participants: order.participants || []
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

function filterPatchedData(context) {
  const order = context.result;
  const newOrder = {
    id: order._id,
    isActive: order.isActive,
    author: {
      id: order.author._id,
      username: order.author.username,
      email: order.author.email,
    },
    title: order.title,
    participants: order.participants,
    creationDate: order.createdAt,
  };
  context.result = newOrder;
  return context;
}

function queryByService(context) {
  const { data } = context;
  const services = {
    addParticipant: () => addParticipant(context)
  };
  return services[data.service]();
}

function addParticipant(context) {
  const { Types } = context.app.settings.mongooseClient;

  const participant = {
    participantId: context.params.user._id,
    selection: context.data.checkedOptions
  };

  return context.app.service('orders')
    .get(context.id)
    .then((order) => {
      const newParticipants = order.participants
        .filter((p) => !Types.ObjectId(p.participantId).equals(Types.ObjectId(participant.participantId)));
      newParticipants.push(participant);
      context.data = { $set: { 'participants': newParticipants }};
      return context;
    });
}

function populateOrder(order, context) {
  const { Types } = context.app.settings.mongooseClient;

  const participantIds = order.participants.map((participant) => {
    return Types.ObjectId(participant.participantId);
  });
  return context.app.service('users')
    .find({ _id: { $in: participantIds }})
    .then((users) => {
      let populatedParticipants = [];
      order.participants.map((participant) => {
        users.data.forEach((user) => {
          if (Types.ObjectId(participant.participantId).equals(Types.ObjectId(user._id))) {
            populatedParticipants.push({
              id: participant._id,
              participantId: participant.participantId,
              username: user.username,
              selection: participant.selection
            });
          }
        });
      });
      order.participants = populatedParticipants;
      return order;
    });
}

function populateOrders(orders, context) {
  return orders.map((order) => {
    return new Promise((resolve)  => {
      populateOrder(order, context)
        .then((res) => {
          resolve(res);
        });
    });
  });
}

function populateOrderParticipants(context) {
  const { result } = context;
  return populateOrder(result, context)
    .then((order) => {
      const newOrder = {
        id: order._id,
        title: order.title,
        author: {
          id: order.author._id,
          username: order.author.username,
        },
        isActive: order.isActive,
        participants: order.populatedParticipants,
        creationDate: order.createdAt,
      };
      context.data = newOrder;
      return context;
    });
}

function populateOrdersParticipants(context) {
  const { result } = context;
  const orders = populateOrders(result, context);
  return Promise.all(orders).then((populatedOrders) => {
    context.result = populatedOrders;
    return context;
  });
}

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      sortByCreationDate,
      projectAuthors
    ],
    get: [],
    create: [],
    update: [],
    patch: [ queryByService, projectAuthors ],
    remove: []
  },

  after: {
    all: [
    ],
    find: [
      filterData,
      populateOrdersParticipants
    ],
    get: [],
    create: [],
    update: [],
    patch: [ populateOrderParticipants, filterPatchedData ],
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
