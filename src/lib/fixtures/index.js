const useJoinedPath = require('./../utils/path');
const getAsset = require('./../utils/assets');
const loadFixture = require('./load-fixture');

module.exports = function (app) {

  const mongooseClient = app.get('mongooseClient');
  const VotesModel = mongooseClient.model('votes');

  const assetsPath = useJoinedPath(__dirname, '../../../private/data/');

  const asset = getAsset(assetsPath, 'Votes.json');
  function loadFixtures() {
    loadFixture(VotesModel, asset);
  }
  return loadFixtures;
};
