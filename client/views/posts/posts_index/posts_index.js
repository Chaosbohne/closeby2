
/*****************************************************************************/
/* PostsIndex: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.PostsIndex.events({
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

Template.PostsIndex.helpers({
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
/* PostsIndex: Lifecycle Hooks */
/*****************************************************************************/
Template.PostsIndex.created = function () {
};

Template.PostsIndex.rendered = function () {
};

Template.PostsIndex.destroyed = function () {
  map.clearMarkers();
};


