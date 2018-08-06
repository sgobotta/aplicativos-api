// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const OrderParticipant = new mongooseClient.Schema({
    participantId: { type: Schema.ObjectId, ref: 'participantId', required: true},
    selection: { type: [String]}
  });

  const orders = new mongooseClient.Schema({
    title: { type: String, required: true },
    author: { type: Schema.ObjectId, ref: 'author', required: true },
    participants: { type: [OrderParticipant] },
    isActive: { type: Boolean, default: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('orders', orders);
};