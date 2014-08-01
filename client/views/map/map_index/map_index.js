/*****************************************************************************/
/* Map: Event Handlers and Helpersss .js*/
/*****************************************************************************/



Template.MapIndex.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.MapIndex.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* Map: Lifecycle Hooks */
/*****************************************************************************/
Template.MapIndex.created = function () {
}

Template.MapIndex.rendered = function () {
  var canvas = this.find('#MapCanvas');
  
  map = new google.maps.Map(canvas, App.getMapOptions());   
  map.Resize();
  google.maps.event.trigger(map, 'resize');
  
  google.maps.event.addDomListener(window, "resize", function() {
    if(map) {
      //manual set height on width, because on xs-size the width is 100%
      //and not fixed with a size. Doing this here with javascript.      

      var center = map.getCenter();      
      map.Resize();
      google.maps.event.trigger(map, 'resize');
      map.setCenter(center); 
    }
  }); 
  google.maps.event.trigger(map, 'resize');
};

Template.MapIndex.destroyed = function () {
  google.maps.event.clearListeners(map, "resize");  
};