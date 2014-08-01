
/*****************************************************************************/
/* FavoriteIndex: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.FavoriteIndex.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
  'click .hashtagrow': function(event, template) {
    event.preventDefault();
    var id = Session.get('showFullPostID');
    if(id && id === this._id)
      Session.set('showFullPostID',  null);
    else  
      Session.set('showFullPostID',  this._id);
  }  
});

Template.FavoriteIndex.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
  isNotCollapsed: function() {
    var id = Session.get('showFullPostID');
    if(id && id === this._id)
      return true;
    return false;
  }  
});

/*****************************************************************************/
/* FavoriteIndex: Lifecycle Hooks */
/*****************************************************************************/
Template.FavoriteIndex.created = function () {
};

Template.FavoriteIndex.rendered = function () {
};

Template.FavoriteIndex.destroyed = function () {
};


