
/*****************************************************************************/
/* Navbar: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Navbar.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Navbar.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* Navbar: Lifecycle Hooks */
/*****************************************************************************/
Template.Navbar.created = function () {
};

Template.Navbar.rendered = function () {
  $('.navbar-affix').affix({
    offset: {
      top: $('header').height()
    }    
  });  
};

Template.Navbar.destroyed = function () {
  console.log('destroyed callback');
  $(window).off('.affix');
  $(".navbar-affix")
  .removeClass("affix affix-top affix-bottom")
  .removeData("bs.affix");
};


