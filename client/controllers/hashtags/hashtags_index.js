var hashtagIndexSubs = new SubsManager({cacheLimit: 20, expireIn: 9999});

HashtagsIndexController = RouteController.extend({
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
    if(user) {      
      return [Meteor.subscribe('hashtags_index', user.profile.discoverLocs.boundingLocs[0], user.profile.discoverLocs.boundingLocs[1], this.findQuery(), this.findOptions()),
              Meteor.subscribe('hashtagsCount', user.profile.discoverLocs.boundingLocs[0], user.profile.discoverLocs.boundingLocs[1], this.findQuery())];       
    }
  },

  hashtags: function() {
    return Hashtags.find({}, {sort : {submitted : -1}});
  },  
  
  subscrBeginDateQuery: function() {
    return Hashtags.find({}, {sort : {submitted : -1}, limit: 1});
  },
   
  hasNewHashtags: function() {
    return Count.findOne({_id : 1});
  },  
  
  data: function () {
    var latestCursor = this.subscrBeginDateQuery().fetch();
    if(latestCursor[0] && !Session.get('subcrBeginDate'))
      Session.set('subcrBeginDate', latestCursor[0].submitted);
    
    var hasMore = this.hashtags().count() === this.limit();
    var count = this.hashtags().count();

    var retValue = {
      hashtags: this.hashtags(),   
      count: count,
      hasMore: hasMore ? (this.limit() + this.increment) : null,
      sessionVariable: 'routingLimit',
      hasNew: this.hasNewHashtags(),
      
      emptyListHelper : {
        infoText :  'No hashtags in your selected area found. Be the <b>first</b> and <b>hashtag!</b>',
        headline : 'NotFound',
        imageSource : '/images/bird.png'        
      }      
    };    
    
    return retValue;
  },

  action: function () {
    this.render();
  },
  
  onStop: function () {
    Session.set('routingLimit', null);
    Session.set('subcrBeginDate', null);    
  }  
});
