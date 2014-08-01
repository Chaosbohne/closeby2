
/*****************************************************************************/
/* PostIndex: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.PostIndex.events({
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

Template.PostIndex.helpers({
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
/* PostIndex: Lifecycle Hooks */
/*****************************************************************************/
Template.PostIndex.created = function () {
};

Template.PostIndex.rendered = function () {
};

Template.PostIndex.destroyed = function () {
};


