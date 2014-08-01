
/*****************************************************************************/
/* LogRender: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.LogRender.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.LogRender.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* LogRender: Lifecycle Hooks */
/*****************************************************************************/
Template.LogRender.created = function () {
};

Template.LogRender.rendered = function () {
function logRenders () {
    _.each(Template, function (template, name) {
      var oldRender = template.rendered;
      var counter = 0;
 
      template.rendered = function () {
        console.log(name, "render count: ", ++counter);
        oldRender && oldRender.apply(this, arguments);
      };
    });
  }
  logRenders();
};

Template.LogRender.destroyed = function () {
};


