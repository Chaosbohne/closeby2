Hashtags = new Meteor.Collection('hashtags');

Schemas.Hashtags = new SimpleSchema([Schemas.Hashtagname, {
  name: {
    type: Schemas.Hashtagname
  },
  submitted: {
    type: Date,
    denyUpdate: true
  },
  loc: {
    type: [GeocoordsSchema],
    denyUpdate: true
  },
  preview: {
    type: String,
    min: 3,
    max: 40,
    denyUpdate: true
  }
}]);

Hashtags.attachSchema(Schemas.Hashtags);
