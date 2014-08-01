
/*****************************************************************************/
/* Star: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Star.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
  'click .star': function(event, template) {
    event.preventDefault();
    Meteor.call('addFavoriteHashtag', {'name' : this.name});
    return false;
  },
  
  'click .unstar' : function(event, template) {
    event.preventDefault();
    Meteor.call('removeFavoriteHashtag', {'name' : this.name});
    return false;
  }  
});

Template.Star.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
  isFavoriteHashtag: function() {
    var user = Meteor.user();
    if(user) {
      return _.contains(user.profile.favoriteHashtags, this.name) ?  true : false;
    }
    return false;
  }  
});

/*****************************************************************************/
/* Star: Lifecycle Hooks */
/*****************************************************************************/
Template.Star.created = function () {
};

Template.Star.rendered = function () {
};

Template.Star.destroyed = function () {
};


