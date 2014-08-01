
/*****************************************************************************/
/* CreateMap: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Session.set('MapClickedLoc', null);

Template.CreateMap.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.CreateMap.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* CreateMap: Lifecycle Hooks */
/*****************************************************************************/
Template.CreateMap.created = function () {
};

Template.CreateMap.rendered = function () {
  var center, zoomLevel;

  var user = Meteor.user();
  if(user) {  
    center = new google.maps.LatLng(user.profile.defaultLocs.centerLoc.lat, user.profile.defaultLocs.centerLoc.lng);
    zoomLevel = user.profile.defaultLocs.zoomLevel;
    
    map.setZoom(zoomLevel);
    map.setCenter(center);  
  
    var openCreatePost = function(event) {
      var latLng = event.latLng;
      Session.set('MapClickedLoc', {lng : latLng.lng(), lat : latLng.lat()});      
      Router.go('create.index');
    };      
    
    var setDiscoverLocs = function(event) {
      var sw = map.getBounds().getSouthWest();
      var ne = map.getBounds().getNorthEast();

      var locs = [
        {lng : sw.lng(), lat : sw.lat()},
        {lng : ne.lng(), lat : ne.lat()}
      ];    
      
      var centerLoc = { lng: map.getCenter().lng(),  lat : map.getCenter().lat() };
      var zoomLevel = map.getZoom();      
      
      var discoverLocs = {'discoverLocs' : {
        'boundingLocs': locs,
        'centerLoc': centerLoc,
        'zoomLevel': zoomLevel
      }};
      
      Meteor.call('setDiscoverLocs', discoverLocs);  
    }; 
    
    google.maps.event.addListener(map, "idle", setDiscoverLocs);           
    google.maps.event.addListener(map, "click", openCreatePost);               
  }
};

Template.CreateMap.destroyed = function () {
};


