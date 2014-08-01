
/*****************************************************************************/
/* HashtagsIndex: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.HashtagsIndex.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
  'mouseenter .hashtagrow': function(event, template) { 
    map.clearMarkers();
    _.each(this.locs, function(item) {
      var latLng = new google.maps.LatLng(item.lat, item.lng);
      var marker = new google.maps.Marker({
          position: latLng,
          map: map
      });
      map.addMarker(marker);
    });
  },
  'mouseleave .hashtagrow': function(event, template) {     
    map.clearMarkers();
  },  
});

Template.HashtagsIndex.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
  hashtagss: function() {
    return Hashtags.find({}, {sort : {submitted : -1}});
  }  
});

/*****************************************************************************/
/* HashtagsIndex: Lifecycle Hooks */
/*****************************************************************************/
Template.HashtagsIndex.created = function () {
};

Template.HashtagsIndex.rendered = function () {
};

Template.HashtagsIndex.destroyed = function () {
  map.clearMarkers();
};


