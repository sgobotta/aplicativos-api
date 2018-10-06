
module.exports = {
  createNewFbUserArgs: function(optionalArgs) {
    const args = {
      _id: '5bb0dbac5d56da0f70222219',
      accessToken: 'token',
      expiresIn: 9999,
      name: 'fb-user-test-name',
      picture: {
        height: 50,
        is_silhouette: false,
        url: "picture-url",
        width: 50,
      },
      signedRequest: 'signed-request',
      userId: 123456789
    };
    return Object.assign({}, args, optionalArgs);
  }
}
