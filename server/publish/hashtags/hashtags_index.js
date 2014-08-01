Future = Npm.require('fibers/future');
Meteor.publish('hashtags_index', function (locBottomLeft, locUpperRight, findQuery, findOptions) {
  if(!locBottomLeft)
    locBottomLeft = [];
  if(!locUpperRight)
    locUpperRight = [];  
  
  var  sort = findOptions.sort || {submitted: -1};
  var limit = findOptions.limit || 10;
  var subcrBeginDate;
  if(findQuery && findQuery.submitted && findQuery.submitted.$lte)
    subcrBeginDate = findQuery.submitted.$lte || new Date();
  else 
    subcrBeginDate = new Date();  
  
  check(locBottomLeft, Schemas.GeocoordsSchema); 
  check(locUpperRight, Schemas.GeocoordsSchema); 
  if(!_.isDate(subcrBeginDate)) {
    subcrBeginDate = new Date();
  } 
  
  var sub = this;
  var db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
 
  
  //MUSTE BE IMPROVED
  //Locs should not contain all hashtag data
  //Just for example the last 10
  var pipeline = [
    { 
      $match: 
      { loc :
       { $geoWithin :
        { $box :  [ [ locBottomLeft.lng, locBottomLeft.lat ] , [ locUpperRight.lng, locUpperRight.lat ] ] }
       },
       submitted: {$lte : subcrBeginDate}
      }
    },   
    {
      $sort: sort
    },    
    {$group :
     {_id: "$name",
      submitted: { $max : "$submitted" },
      locs: { $push: "$loc" },
      preview: {$first : "$preview"}
     }
    },
    {
      $sort: sort
    },    
    {
      $limit: limit
    }
  ];
    
  var fut = new Future();
  db.collection("hashtag").aggregate(        
    pipeline,
    function(error, result) {
      _.each(result, function(item){        
        sub.added("hashtags", item._id, {
          name: item._id,
          submitted: item.submitted,
          locs : item.locs,
          preview: item.preview
        });
      });
      sub.ready();
      fut.return();
    }
  );    
  return fut.wait();  
});


Meteor.publish("hashtagsCount", function(locBottomLeft, locUpperRight, findQuery) {
  if(!locBottomLeft)
    locBottomLeft = [];
  if(!locUpperRight)
    locUpperRight = [];  
  
  var subcrBeginDate;
  if(findQuery && findQuery.submitted && findQuery.submitted.$lte)
    subcrBeginDate = findQuery.submitted.$lte || new Date();
  else 
    subcrBeginDate = new Date();
  
  check(locBottomLeft, Schemas.GeocoordsSchema); 
  check(locUpperRight, Schemas.GeocoordsSchema);   
  if(!_.isDate(subcrBeginDate)) {
    subcrBeginDate = new Date();
  }  
  
   var sub = this;
   var count = 0;
   initializing = true;
   var handle = Hashtag.find({submitted: {$gt : subcrBeginDate},
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
