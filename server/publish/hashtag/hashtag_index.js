
Meteor.publish('hashtag_latest', function (locBottomLeft, locUpperRight) {
  // you can remove this if you return a cursor
  
  if(!locBottomLeft)
    locBottomLeft = [];
  if(!locUpperRight)
    locUpperRight = [];  
  
  check(locBottomLeft, Schemas.GeocoordsSchema); 
  check(locUpperRight, Schemas.GeocoordsSchema);   
  
  return Hashtag.find({loc:
                       {$geoWithin:
                        {$box:
                         [[locBottomLeft.lng, locBottomLeft.lat],
                          [locUpperRight.lng, locUpperRight.lat]]
                        }
                       }
                      },{sort: {submitted : -1}, limit: 1});

});