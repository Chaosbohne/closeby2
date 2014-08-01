/*****************************************************************************/
/* Hashtags Methods */
/*****************************************************************************/

Meteor.methods({
 /*
  * Example:
  *  '/app/hashtags/update/email': function (email) {
  *    Users.update({_id: this.userId}, {$set: {'profile.email': email}});
  *  }
  *
  */
  addFavoriteHashtag: function(hashtag) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to do any changes");   
    
    check(hashtag, Schemas.Hashtagname);
    
    Meteor.users.update({_id:Meteor.user()._id}, {$addToSet:{"profile.favoriteHashtags": hashtag.name}});

    return Meteor.user();
  },
  removeFavoriteHashtag: function(hashtag) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to do any changes");            
    
    check(hashtag, Schemas.Hashtagname);
    
    Meteor.users.update({_id:Meteor.user()._id}, {$pull:{"profile.favoriteHashtags": hashtag.name}});
    
    return Meteor.user();
  }
  
});
