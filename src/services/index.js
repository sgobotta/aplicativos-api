/**
 * @module ServicesIndex
 */

const users = require('./users/users.service.js');
const messages = require('./messages/messages.service.js');
const deputiesVotes = require('./abortion-project/deputies-votes.service.js');
const orders = require('./orders/orders.service.js');
const fbUser = require('./fb-user/fb.user.service.js');

module.exports = function (app) {
  app.configure(users);
  app.configure(messages);
  app.configure(deputiesVotes);
  app.configure(orders);
  app.configure(fbUser);
};
