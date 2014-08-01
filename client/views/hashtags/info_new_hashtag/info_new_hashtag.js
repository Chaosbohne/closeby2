
/*****************************************************************************/
/* InfoNewHashtag: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.InfoNewHashtag.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
  'click .loadmore': function(event, template) {
    event.preventDefault();
    Router.go(this.refreshRoute);
  }
});

Template.InfoNewHashtag.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
  /*
  amountOfNewHashtagMinusDefaultHashtags: function() {
    return this.amountOfNewHashtags - 1;
  }*/
});

/*****************************************************************************/
/* InfoNewHashtag: Lifecycle Hooks */
/*****************************************************************************/
Template.InfoNewHashtag.created = function () { 
  
  

  
  /*
  var observer = Hashtag.find().observe({
    added: function(id, user) {
      var amount = Session.get('amountOfNewHashtags');
      if(_.isNumber(amount)) {
        Session.set('amountOfNewHashtags', amount + 1);  
      }else {
        Session.set('amountOfNewHashtags', 0);
      } 
    }
  });
  */
  
};

Template.InfoNewHashtag.rendered = function () {
  this.observer = this.hashtags.observe( {
    added: function(id, user) {
      console.log('ADDED');
    }
  });
  this.observer = observer;    
};

Template.InfoNewHashtag.destroyed = function () {
  this.observer.stop();
};


