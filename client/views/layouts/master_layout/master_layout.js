
/*****************************************************************************/
/* MasterLayout: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MasterLayout.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.MasterLayout.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* MasterLayout: Lifecycle Hooks */
/*****************************************************************************/
Template.MasterLayout.created = function () {
};

Template.MasterLayout.rendered = function () {      
  $('#sidebar').affix({
    offset: {
      top: $('header').height()
    }
  });         
};

Template.MasterLayout.destroyed = function () { 
  $(window).off('.affix');
  $("#sidebar")
  .removeClass("affix affix-top affix-bottom")
  .removeData("bs.affix");      
};
