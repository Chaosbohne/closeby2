/*****************************************************************************/
/* FavoritesIndex Publish Functions
/*****************************************************************************/

Meteor.publish('favorites_index',  function (locBottomLeft, locUpperRight, favs, findQuery, findOptions) {
  if(!locBottomLeft)
    locBottomLeft = [];
  if(!locUpperRight)
    locUpperRight = [];  
  
  var  sort = findOptions.sort || {submitted: -1};
  var limit = findOptions.limit || 10;
  favs = favs || [];
  var subcrBeginDate;
  
  if(findQuery && findQuery.submitted && findQuery.submitted.$lte)
    subcrBeginDate = findQuery.submitted.$lte || new Date();
  else 
    subcrBeginDate = new Date();
  
  check(locBottomLeft, Schemas.GeocoordsSchema); 
  check(locUpperRight, Schemas.GeocoordsSchema); 
  
  console.log(favs);
  
  _.each(favs, function(item) {
    var hashtag = {'name' : item}
    check(hashtag, Schemas.Hashtagname);
  });
  
  if(!_.isDate(subcrBeginDate)) {
    subcrBeginDate = new Date();
  }
  
  return Posts.find({submitted: {$lte : subcrBeginDate},
                     loc: {$geoWithin: {$box:
                       [[locBottomLeft.lng, locBottomLeft.lat],
                        [locUpperRight.lng, locUpperRight.lat]]}},
                    hashtag: {$in: favs}}, {sort: sort, limit: limit});  
});

Meteor.publish("favorites_count", function(locBottomLeft, locUpperRight, favs, findQuery) {
  if(!locBottomLeft)
    locBottomLeft = [];
  if(!locUpperRight)
    locUpperRight = [];  
  
    favs = favs || [];
  var subcrBeginDate;
  if(findQuery && findQuery.submitted && findQuery.submitted.$lte)
    subcrBeginDate = findQuery.submitted.$lte || new Date();
  else 
    subcrBeginDate = new Date();
  
  check(locBottomLeft, Schemas.GeocoordsSchema); 
  check(locUpperRight, Schemas.GeocoordsSchema);   
  
  _.each(favs, function(item) {
    var hashtag = {'name' : item}
    check(hashtag, Schemas.Hashtagname);
  });
  
  if(!_.isDate(subcrBeginDate)) {
    subcrBeginDate = new Date();
  }  
  
   var sub = this;
   var count = 0;
   initializing = true;
   var handle = Posts.find({hashtag: {$in: favs},
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

