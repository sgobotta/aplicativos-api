// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');

  const { Schema } = mongooseClient;

  const PictureData = new Schema({
    height: { type: Number },
    is_silhouette: { type: Boolean },
    url: { type: String },
    width: { type: Number },
  }, {
    _id: false,
    timestamps: true
  });

  const Picture = new Schema({
    data: { type: PictureData },
  }, { _id: false });


  const FbUser = new mongooseClient.Schema({
    id: { type: String },
    accessToken: { type: String },
    expiresIn: { type: Number },
    name: { type: String },
    email: { type: String },
    picture:  { type: Picture },
    signedRequest: { type: String },
    userID: { type: String },
    userRef: { type: Schema.ObjectId, ref: 'users', unique: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('FbUser', FbUser);
};
