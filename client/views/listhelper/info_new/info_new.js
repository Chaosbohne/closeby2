
/*****************************************************************************/
/* InfoNew: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.InfoNew.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
  
  'click .loadmore': function(event, template) {
    event.preventDefault();
    //subcrBeginDate = _.random(0, 100);
    Session.set('subcrBeginDate', null);
    //Session.set('subcrBeginDate', new Date());
    //Session.set('reactiveRoute', {id : Date.now()});
    //Session.set('amountOfNew', 0);
    //Session.set('submitted', null); 
    //Router.go('hashtags.index');
  }
});

Template.InfoNew.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
  /*
  'amountOfNew': function() {
    return Session.get('amountOfNew') || 0;
  }*/

});

/*****************************************************************************/
/* InfoNew: Lifecycle Hooks */
/*****************************************************************************/
Template.InfoNew.created = function () {
};

Template.InfoNew.rendered = function () {
  /*
  if(this.data && this.data.observer) {
    var init = true;

    this.observer = this.data.observer.observe({
      added: function(document) {
        if(!init) {
          var post = Posts.find({},{sort: {submitted: -1}, limit: 1}).fetch();
          console.log(document.submitted.getTime());
          console.log(post[0].submitted.getTime());

            var count = Session.get('amountOfNew');
            if(_.isNumber(count)) {
              if(count === 0) {
                Session.set('submitted', document.submitted); 
              }
              Session.set('amountOfNew', count + 1);
            }else {
              Session.set('amountOfNew', 1);
              Session.set('submitted', document.submitted); 
            }
          
        }
      }
    });

    init = false;
  }*/
};

Template.InfoNew.destroyed = function () {
};


