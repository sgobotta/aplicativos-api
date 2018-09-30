
const utils = {};

const strategies = {
  facebook: (context) => dispatchFacebook(context),
  local: (context) => context,
  jwt: (context) => context,
};

function dispatchFacebook(context) {
  const authService = context.app.passport.authenticate('facebook')();

  console.log(authService);
  return context;
}

utils.dispatchStrategy = (context) => {
  const { strategy } = context.data;
  return strategies[strategy](context)
}

module.exports = utils;
