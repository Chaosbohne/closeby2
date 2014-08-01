var path = Npm.require('path');
var Future = Npm.require(path.join('fibers', 'future'));
mongo = MongoInternals.defaultRemoteCollectionDriver().mongo;
db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;

(function () {
  
  
  var _aggr = (function() {
    if (typeof aggr === "undefined" || aggr === null) {
      var aggr = {};
      
      var fut = new Future();
      
      aggr.publish = function(collectionName, pipeline) {
        var collection = mongo._getCollection(collectionName);
        
        collection.aggregate(        
          pipeline,
          function(error, result) {
            if(error) {
              fut.throw(error);
            }
            fut.return(result);
          }
        );    
        return fut.wait();   
      };      
    }
    
    return twttr;
  });
  
})();

Meteor.Collection.prototype.aggregate = function(pipeline){
  var collectionName = this._name;
  var fut = new Future();

  var sub = this;

  db.collection(collectionName).aggregate(        
    pipeline,
    function(error, result) {
      if(error) {
        fut.throw(error);
      }
      _.each(result, function(item){
        sub.added("hashtags", Random.id(), {
          name: item._id,
          count: item.count,
          distance: item.distance,
          submitted: item.submitted
        });
        sub.ready();
        fut.return(result);
      });    
      return fut.wait();   
    });
}
    