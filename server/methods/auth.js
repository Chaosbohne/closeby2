

Accounts.onCreateUser(function(options, user) {
  
  var tmpUser = _.omit(options, 'password');

  check(tmpUser, Schemas.signUpAuthServer);

  user.profile = _.pick(tmpUser, 'name', 'defaultLocs');
  
  user.profile.defaultLocs = tmpUser.defaultLocs;
  user.profile.discoverLocs = tmpUser.defaultLocs;
  user.profile.favoriteHashtags = [];

  return user;
});

Meteor.methods({
  setDiscoverLocs: function(discoverLocs){

    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to do any changes");        

    check(discoverLocs, Schemas.DiscoverMapDataSchema);

    var ret = Meteor.users.update( {_id: user._id}, {$set: {"profile.discoverLocs" : discoverLocs.discoverLocs}});

    return user;  
  }
});