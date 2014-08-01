FavoritesIndexController = RouteController.extend({
  yieldTemplates: {
    'CreateMap': {to: 'side'}
  },  
  
  increment: 10,  
  
  limit: function() {
    return Session.get('routingLimit') || this.increment;
  },
  
  findOptions: function() {
    return {sort : {submitted : -1}, limit: this.limit()};
  },  
  
  findQuery: function() {
    return {submitted: {$lte : Session.get('subcrBeginDate')}};
  },  
    
  waitOn: function () {
    var user = Meteor.user();
    if(user && user) {
      return [Meteor.subscribe('favorites_index', user.profile.discoverLocs.boundingLocs[0], user.profile.discoverLocs.boundingLocs[1], user.profile.favoriteHashtags, this.findQuery(), this.findOptions()),
              Meteor.subscribe('favorites_count', user.profile.discoverLocs.boundingLocs[0], user.profile.discoverLocs.boundingLocs[1],  user.profile.favoriteHashtags, this.findQuery())]; 
    }    
  },

  subscrBeginDateQuery: function() {
    return Posts.find({hashtag: this.params.name}, {sort : {submitted : -1}, limit: 1});
  },
  
  posts: function() {
    return Posts.find({}, {sort : {submitted : -1}});
  },    
  
  hasNewPosts: function() {
    return Count.findOne({_id : 1});
  },  
  
  data: function () {
    var latestCursor = this.subscrBeginDateQuery().fetch();
    if(latestCursor[0] && !Session.get('subcrBeginDate'))
      Session.set('subcrBeginDate', latestCursor[0].submitted);
    
    var hasMore = this.posts().count() === this.limit();
    var count = this.posts().count();

    var retValue = {
      count: count,
      posts: this.posts(),    
      hasMore: hasMore ? (this.limit() + this.increment) : null,
      sessionVariable: 'routingLimit',
      hasNew: this.hasNewPosts(),
      
      emptyListHelper : {
        infoText :  'No favorite posts in your selected area found. Be the <b>first</b> and <b>hashtag!</b>',
        headline : 'NotFound',
        imageSource : '/images/bird.png'        
      }      
    }
    return retValue;
  },

  action: function () {
    this.render();
  }
});
