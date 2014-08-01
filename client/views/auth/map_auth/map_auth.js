
/*****************************************************************************/
/* MapAuth: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MapAuth.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.MapAuth.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* MapAuth: Lifecycle Hooks */
/*****************************************************************************/
Template.MapAuth.created = function () {
};

Template.MapAuth.rendered = function () {
  function handleNoGeolocation(errorFlag) {
    map.setCenter(new google.maps.LatLng(-33.85692999999974, 151.21528));
    map.setZoom(8);
  }  
  
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }  
};

Template.MapAuth.destroyed = function () {
};


