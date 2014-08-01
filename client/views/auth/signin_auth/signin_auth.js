
/*****************************************************************************/
/* SigninAuth: Event Handlers and Helpersss .js*/
/*****************************************************************************/

Session.setDefault("AuthHasLoginError", false);

Template.SignInAuth.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
  'blur input[name=email]': function(event, template) {
    Session.set('AuthHasSavedEmailOnViewChange', event.currentTarget.value);
  },

  'blur input[name=password]': function(event, template) {
    Session.set('AuthHasSavedPasswordOnViewChange', event.currentTarget.value);
  },    
  
  'click .goSignUpWorkflow': function(event, template) {
    event.preventDefault();
    Session.set('AuthIsSignInWorkflow', false);
  }  
});

Template.SignInAuth.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
  hasSavedEmailOnViewChange: function() {
    return Session.get('AuthHasSavedEmailOnViewChange');
  },
  
  hasSavedPasswordOnViewChange : function() {
    return Session.get('AuthHasSavedPasswordOnViewChange');
  },
  
  hasLoginError: function() {
    return Session.get('AuthHasLoginError');
  },
  
  signInSchema: function() {
    return Schemas.signInAuth;
  }  
});

/*****************************************************************************/
/* SigninAuth: Lifecycle Hooks */
/*****************************************************************************/
Template.SignInAuth.created = function () {
};

Template.SignInAuth.rendered = function () {
};

Template.SignInAuth.destroyed = function () {
};

AutoForm.hooks({
  signInForm: {
    onSubmit: function (insertDoc, updateDoc, currentDoc) {

      Meteor.loginWithPassword(insertDoc.email, insertDoc.password, function(error) {
        if(error) {
          Session.set('AuthHasLoginError', error.reason);
        }else {
          Session.set('AuthHasLoginError', false);
          Router.go('hashtags.index');
        }
      });
      
      return false;    
    }
  }
});
