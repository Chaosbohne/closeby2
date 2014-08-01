
/*****************************************************************************/
/* FavoritesIndex: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.FavoritesIndex.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
  'mouseenter .hashtagrow': function(event, template) { 
    map.clearMarkers();
    if(this.loc) {
      var latLng = new google.maps.LatLng(this.loc.lat, this.loc.lng);
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
      map.addMarker(marker);
    }
  },
  'mouseleave .hashtagrow': function(event, template) {     
    map.clearMarkers();
  }   
});

Template.FavoritesIndex.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
  postss: function() {
    return Posts.find({}, {sort : {submitted : -1}});
  }  
});

/*****************************************************************************/
/* FavoritesIndex: Lifecycle Hooks */
/*****************************************************************************/
Template.FavoritesIndex.created = function () {
};

Template.FavoritesIndex.rendered = function () {
};

Template.FavoritesIndex.destroyed = function () {
  map.clearMarkers();  
};


