
const utils = {}

/** Helpers */

function protectUser(user) {
  return {
    id: user._id,
    email: user.email,
    username: user.username,
    facebookId: user.facebookId,
  };
}

/** Before Hooks */

/** Remove */

utils.createQuery = async (context) => {
  const mongooseClient = context.app.get('mongooseClient');
  const FbUserApi = mongooseClient.models.FbUser;
  const fbUser = await FbUserApi.findOne({ userRef: context.id });
  const fbUserId = fbUser._id;
  context.id = fbUserId
  return context;
}

/** Create */

utils.updateOrCreateUser = async (context) => {
  const mongooseClient = context.app.get('mongooseClient');
  const UsersApi = mongooseClient.models.users;
  const FbUserApi = mongooseClient.models.FbUser;

  const { user, fbData } = context.data.data;
  const isUserAuthenticated = user.isAuthenticated;

  const userWithFacebookIdExists = await UsersApi.findOne({
    facebookId: fbData.userID,
  });


  // user is not authenticated and the facebookId should be updated.
  if (!isUserAuthenticated) {
    // user does not exist and a new one must be created, then the hook
    // creates the fb user.
    if (!userWithFacebookIdExists) {
      const createdUser = await UsersApi.create({
        facebookId: fbData.userID,
      });
      const createFbUserArgs = fbData;
      createFbUserArgs.userRef = createdUser._id;
      context.data = createFbUserArgs;
      return context;
    }
    // user exists, the hook just creates the fb user.
    else {
      const createFbUserArgs = fbData;
      createFbUserArgs.userRef = userWithFacebookIdExists._id;
      context.data = createFbUserArgs;
      return context;
    }
  }
  // user is authenticated and the facebookId should be updated.
  else {
    const updatedUser = await UsersApi.update({ _id: user.data.id }, {
      facebookId: fbData.userID
    });
    const createFbUserArgs = fbData;
    createFbUserArgs.userRef = user.data.id;
    context.data = createFbUserArgs;
    return context;
  }
}

utils.updateIfExists = async (context) => {
  const mongooseClient = context.app.get('mongooseClient');
  const FbUserApi = mongooseClient.models.FbUser;
  const fbUserExists = await FbUserApi.findOne({ userRef: context.data.userRef });
  if (fbUserExists) {
    const updatedFbUser = await FbUserApi.update({ userRef: context.data.userRef }, context.data);
    context.result = context.data;
    context.data = {};
  }
  return context;
}

/** After Hooks */

/** Remove */

utils.updateUserFacebookId = async (context) => {
  const mongooseClient = context.app.get('mongooseClient');
  const UsersApi = mongooseClient.models.users;
  const userId = context.result.userRef;
  const user = await UsersApi.findOne(userId);
  if (!user.password) {
    const deletedUser = await UsersApi.remove({ _id: userId });
  }
  const updatedUser = await UsersApi.update({ _id: userId }, { $unset: { facebookId: 1 }});
  return context;
}

/** Create */

utils.populateResponse = async (context) => {
  const mongooseClient = context.app.get('mongooseClient');
  const UsersApi = mongooseClient.models.users;

  const { result } = context;
  const fbData = result;
  const userResult = await UsersApi.findOne({ _id: result.userRef });
  const user = protectUser(userResult);
  context.result = { fbData, user };
  return context;
}

module.exports = utils;
