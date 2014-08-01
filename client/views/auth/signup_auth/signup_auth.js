
/*****************************************************************************/
/* SignupAuth: Event Handlers and Helpersss .js*/
/*****************************************************************************/

Session.setDefault("AuthHasRegisterError", false);

Template.SignUpAuth.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
  'blur input[name=name]': function(event, template) {
    Session.set('AuthHasSavedNameOnViewChange', event.currentTarget.value);
  },  
  
  'blur input[name=email]': function(event, template) {
    Session.set('AuthHasSavedEmailOnViewChange', event.currentTarget.value);
  },

  'blur input[name=password]': function(event, template) {
    Session.set('AuthHasSavedPasswordOnViewChange', event.currentTarget.value);
  },  
  
  'click .goSignInWorkflow': function(event, template) {
    event.preventDefault();
    Session.set('AuthIsSignInWorkflow', true);
  }
});

Template.SignUpAuth.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
  hasSavedNameOnViewChange: function() {
    return Session.get('AuthHasSavedNameOnViewChange');
  },
  
  hasSavedEmailOnViewChange: function() {
    return Session.get('AuthHasSavedEmailOnViewChange');
  },
  
  hasSavedPasswordOnViewChange : function() {
    return Session.get('AuthHasSavedPasswordOnViewChange');
  },
  
  hasRegisterError: function() {
    return Session.get('AuthHasRegisterError');
  },
  
  signUpSchema: function() {
    return Schemas.signUpAuthClient;
  }
});

/*****************************************************************************/
/* SignupAuth: Lifecycle Hooks */
/*****************************************************************************/
Template.SignUpAuth.created = function () {
};

Template.SignUpAuth.rendered = function () {
};

Template.SignUpAuth.destroyed = function () {
};

AutoForm.hooks({
  signUpForm: {

    onSubmit: function(insertDoc, updateDoc, currentDoc) {

      var sw = map.getBounds().getSouthWest();
      var ne = map.getBounds().getNorthEast();
      
      var locs = [
        {lng : sw.lng(), lat : sw.lat()},
        {lng : ne.lng(), lat : ne.lat()}
      ];
      
      
      var centerLoc = { lng: map.getCenter().lng(),  lat : map.getCenter().lat() };
      var zoomLevel =  map.getZoom();
      
      var defaultLocs = {'defaultLocs' : {
        'boundingLocs': locs,
        'centerLoc': centerLoc,
        'zoomLevel': zoomLevel
      }};
        
      
      _.extend(insertDoc, defaultLocs);      

      var isValid = Match.test(insertDoc, Schemas.signUpAuthClientServer);
      if(!isValid)
        return false;

      
      Accounts.createUser(insertDoc, function(error){
        if(error) {
          Session.set('AuthHasRegisterError', error.reason);
        }else {
          Session.set('AuthHasRegisterError', false);
          console.log(Meteor.user());
          Router.go('hashtags.index');
        }
      });
      
      return false;
    }
  }
});
  
