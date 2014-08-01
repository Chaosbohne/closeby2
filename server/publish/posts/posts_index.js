/*****************************************************************************/
/* PostsIndex Publish Functions
/*****************************************************************************/


Meteor.publish('posts_index', function (locBottomLeft, locUpperRight, findQuery,  findOptions) {
  
  if(!locBottomLeft)
    locBottomLeft = [];
  if(!locUpperRight)
    locUpperRight = [];  
  
  var  sort = findOptions.sort || {submitted: -1};
  var limit = findOptions.limit || 10;
  var hashtag = {'name' : findQuery.hashtag || 'notfound'};
  var subcrBeginDate;
  if(findQuery && findQuery.submitted && findQuery.submitted.$lte)
    subcrBeginDate = findQuery.submitted.$lte || new Date();
  else 
    subcrBeginDate = new Date();
  
  check(locBottomLeft, Schemas.GeocoordsSchema); 
  check(locUpperRight, Schemas.GeocoordsSchema); 
  check(hashtag, Schemas.Hashtagname);
  if(!_.isDate(subcrBeginDate)) {
    subcrBeginDate = new Date();
  }
    
  return Posts.find({hashtag: hashtag.name,
                     submitted: {$lte : subcrBeginDate},
                     loc: {$geoWithin: {$box:
                       [[locBottomLeft.lng, locBottomLeft.lat],
                        [locUpperRight.lng, locUpperRight.lat]]}}}, {sort: sort, limit: limit});  
});


Meteor.publish("postsCount", function(locBottomLeft, locUpperRight, findQuery) {
  if(!locBottomLeft)
    locBottomLeft = [];
  if(!locUpperRight)
    locUpperRight = [];  
  
  var hashtag = {'name' : findQuery.hashtag || 'notfound'};
  var subcrBeginDate;
  if(findQuery && findQuery.submitted && findQuery.submitted.$lte)
    subcrBeginDate = findQuery.submitted.$lte || new Date();
  else 
    subcrBeginDate = new Date();
  
  check(locBottomLeft, Schemas.GeocoordsSchema); 
  check(locUpperRight, Schemas.GeocoordsSchema);   
  check(hashtag, Schemas.Hashtagname);
  if(!_.isDate(subcrBeginDate)) {
    subcrBeginDate = new Date();
  }  
  
   var sub = this;
   var count = 0;
   initializing = true;
   var handle = Posts.find({hashtag: hashtag.name,
                            submitted: {$gt : subcrBeginDate},
                            loc: {$geoWithin: {$box:
                            [[locBottomLeft.lng, locBottomLeft.lat],
                             [locUpperRight.lng, locUpperRight.lat]]}}}).observe({
     added: function(){
       if(!initializing) {
         count++;
         sub.changed('count', 1, {
           count: count
         });
       }
     }
   });

  initializing = false;
  
  sub.added("count", 1, {
    count: count
  });
  
  this.ready();
  
  return this.onStop(function() {
    return handle.stop();
  });
});



/*
Meteor.publish('posts_index', function (locBottomLeft, locUpperRight, findQuery,  findOptions) {
  
  if(!locBottomLeft)
    locBottomLeft = [];
  if(!locUpperRight)
    locUpperRight = [];  
  
  var  sort = findOptions.sort || {submitted: -1};
  var limit = findOptions.limit || 10;
  var hashtag = {'name' : findQuery.hashtag || 'notfound'};
  
  check(locBottomLeft, Schemas.GeocoordsSchema); 
  check(locUpperRight, Schemas.GeocoordsSchema); 
  check(hashtag, Schemas.Hashtagname);
    
  return Posts.find({hashtag: hashtag.name, 
                     loc: {$geoWithin: {$box:
                       [[locBottomLeft.lng, locBottomLeft.lat],
                        [locUpperRight.lng, locUpperRight.lat]]}}}, {sort: sort, limit: limit});  
});
*/