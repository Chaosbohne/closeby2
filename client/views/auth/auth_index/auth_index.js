/*****************************************************************************/
/* AuthIndex: Event Handlers and Helpersss .js*/
/*****************************************************************************/


Session.setDefault("AuthIsSignInWorkflow", true);
Session.setDefault("AuthHasSavedEmailOnViewChange", "");
Session.setDefault("AuthHasSavedPasswordOnViewChange", "");
Session.setDefault("AuthHasSavedNameOnViewChange", "");

Template.AuthIndex.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.AuthIndex.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
  
  isSignInWorkflow: function() {
    return Session.get('AuthIsSignInWorkflow');
  }
});

/*****************************************************************************/
/* AuthIndex: Lifecycle Hooks */
/*****************************************************************************/
Template.AuthIndex.created = function () {
};

Template.AuthIndex.rendered = function () {
};

Template.AuthIndex.destroyed = function () {
};


