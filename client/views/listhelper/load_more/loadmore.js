
/*****************************************************************************/
/* LoadmoreHashtag: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.LoadMore.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
  'click .incrSession': function() {
    Session.set(this.sessionVariable, this.hasMore);
  }    
});

Template.LoadMore.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* LoadmoreHashtag: Lifecycle Hooks */
/*****************************************************************************/
Template.LoadMore.created = function () {
};

Template.LoadMore.rendered = function () {
};

Template.LoadMore.destroyed = function () {
};


