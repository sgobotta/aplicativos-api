// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    email: { type: String },
    password: { type: String },
    username: { type: String },
    facebookId: { type: String },
    accessToken: { type: String },
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
