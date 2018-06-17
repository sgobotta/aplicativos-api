const logger = require('winston');

const Hooks = {
  _hooks: {},

  add(type, callback) {
    if (typeof this._hooks[type] === 'undefined') {
      this._hooks[type] = [];
    }
    this._hooks[type].push(callback);
  },

  run(type) {
    const callbacks = this._hooks[type];
    if (typeof callbacks !== 'undefined' && !!callbacks.length) {
      logger.info(':: Running Before Core Init Hooks... ::');
      return callbacks.forEach((callback) => callback());
    }
    return null;
  }
};

module.exports = Hooks;
