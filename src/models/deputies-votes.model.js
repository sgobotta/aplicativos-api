/**
 * @module DeputiesVotesModel
 */

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const deputiesVotes = new mongooseClient.Schema({

    name: { type: String, required: true },
    province: { type: String, required: true },
    percentage: { type: Number, required: true }

  }, {
    timestamps: true
  });

  return mongooseClient.model('votes', deputiesVotes);
};
