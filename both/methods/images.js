Meteor.methods({
 /*
  * Example:
  *  '/app/hashtags/update/email': function (email) {
  *    Users.update({_id: this.userId}, {$set: {'profile.email': email}});
  *  }
  *
  */
  '/create/getImage': function(id) {
    return Images.findOne({_id : id});
  }
});
