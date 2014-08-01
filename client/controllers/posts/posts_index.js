var postIndexSubs = new SubsManager({cacheLimit: 20, expireIn: 9999});


PostsIndexController = RouteController.extend({
  
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
    return {hashtag: this.params.name, submitted: {$lte : Session.get('subcrBeginDate')}};
  },  
  
  findQuery2: function() {
    var user = Meteor.user();
    if(!Session.get('subcrBeginDate'))
      return {hashtag: this.params.name, $and: [{'loc.lng' : {$gte: user.profile.discoverLocs.boundingLocs[0].lng}},
                                                {'loc.lng' : {$lte: user.profile.discoverLocs.boundingLocs[1].lng}},
                                                {'loc.lat' : {$gte: user.profile.discoverLocs.boundingLocs[0].lat}},
                                                {'loc.lat' : {$lte: user.profile.discoverLocs.boundingLocs[1].lat}}]};
  
    return {hashtag: this.params.name, submitted: {$lte : Session.get('subcrBeginDate')},
            $and: [{'loc.lng' : {$gte: user.profile.discoverLocs.boundingLocs[0].lng}},
                                                {'loc.lng' : {$lte: user.profile.discoverLocs.boundingLocs[1].lng}},
                                                {'loc.lat' : {$gte: user.profile.discoverLocs.boundingLocs[0].lat}},
                                                {'loc.lat' : {$lte: user.profile.discoverLocs.boundingLocs[1].lat}}]};
  },
  
  waitOn: function () {
    var user = Meteor.user();
    if(user) {
      return [Meteor.subscribe('posts_index', user.profile.discoverLocs.boundingLocs[0], user.profile.discoverLocs.boundingLocs[1], this.findQuery(), this.findOptions()),
              Meteor.subscribe('postsCount', user.profile.discoverLocs.boundingLocs[0], user.profile.discoverLocs.boundingLocs[1], this.findQuery())]; 
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
      name : this.params.name,
      count: count,
      posts: this.posts(),    
      hasMore: hasMore ? (this.limit() + this.increment) : null,
      sessionVariable: 'routingLimit',
      hasNew: this.hasNewPosts(),
      
      emptyListHelper : {
        infoText :  'No posts with name <b>' + this.params.name + '</b> in your selected area found. Be the <b>first</b> and <b>hashtag!</b>',
        headline : 'NotFound',
        imageSource : '/images/bird.png'        
      }      
    }
    return retValue;
  },

  action: function () {
    this.render();
  },
  
  onStop: function () {
    Session.set('routingLimit', null);
    Session.set('subcrBeginDate', null);
    Session.set('showFullPostID',  null);
  }    
});