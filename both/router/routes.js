/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  templateNameConverter: 'upperCamelCase',
  routeControllerNameConverter: 'upperCamelCase'
});



beforeHooks =  {
  isNotLoggedIn: function() {
    if(!(Meteor.loggingIn() || Meteor.user())) {
      Router.go('auth.index');
    }
  }/*,
  isLoggedIn: function() {
    if((Meteor.loggingIn() || Meteor.user())) {
      Router.go('posts.index');
    }    
  }*/
}

Router.onBeforeAction(beforeHooks.isNotLoggedIn, {except: ['auth.index']});
Router.onBeforeAction(beforeHooks.isLoggedIn, {only: ['auth.index']});

Router.map(function () {
  /*
    Example:
      this.route('home', {path: '/'});
  */
  this.route('hashtags.index', {path: '/'});
  this.route('auth.index', {path: '/auth'});
  this.route('posts.index', {path: '/tag/:name'});
  this.route('create.index', {path: '/create'});
  this.route('favorites.index', {path: '/fav'});
});


