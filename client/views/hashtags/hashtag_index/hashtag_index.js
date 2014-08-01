
/*****************************************************************************/
/* HashtagIndex: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.HashtagIndex.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */    
  'click li': function(event, template) {
    if(this.name) {
      Router.go('posts.index', {name: this.name});
    }
  }
});

Template.HashtagIndex.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* HashtagIndex: Lifecycle Hooks */
/*****************************************************************************/
Template.HashtagIndex.created = function () {
};

Template.HashtagIndex.rendered = function () {
};

Template.HashtagIndex.destroyed = function () {
};


