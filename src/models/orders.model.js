// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const OrderParticipant = new mongooseClient.Schema({
    participantId: { unique: true, type: Schema.Types.ObjectId, ref: 'users', required: true},
    selection: { type: [String]}
  });

  const orders = new mongooseClient.Schema({
    title: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    participants: {
      type: [OrderParticipant]
    },
    isActive: {
      type: Boolean,
      default: true
    },
    expiresAt: {
      type: Date,
      requied: true,
      default: Date.now()
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('orders', orders);
};
