const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const oauth2 = require('@feathersjs/authentication-oauth2');
const FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function (app) {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());
  app.configure(oauth2({
    name: 'facebook',
    Strategy: FacebookStrategy,
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret,
    successRedirect: config.facebook.successRedirect,
    idField: config.facebook.idField,
    path: config.facebook.path,
    scope: config.facebook.scope,
    profileFields: config.facebook.profileFields
  }));

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    },
    after: {
      create: [
        hook => {
          hook.result.user = {
            id: hook.params.user._id,
            email: hook.params.user.email,
            username: hook.params.user.username,
            accessToken: hook.params.accessToken
          };
          return hook;
        }
      ]
    },
  });
};
