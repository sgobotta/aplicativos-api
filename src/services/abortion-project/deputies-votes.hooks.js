/**
 * @module DeputiesVotesHooks
 */

const logger = require('./../../hooks/logger');

function addDataTitle() {
  return context => {
    const { result } = context;
    result.unshift(['Provinces', 'Votos a Favor']);
    context.result = result;
  };
}

function projectVotes() {
  return context => {
    context.result = context.result.map((vote) => {
      return [{ v: vote.province, f: vote.name }, vote.percentage];
    });
  };
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [logger()],
    find: [projectVotes(), addDataTitle()],
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
