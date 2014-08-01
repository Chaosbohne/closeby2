Meteor.publish('image', function (imageId) {
  // you can remove this if you return a cursor
  return Images.find({ _id : imageId });
});