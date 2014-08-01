Hashtag = new Meteor.Collection('hashtag');

Schemas.Hashtagname = new SimpleSchema({
  name: {
    type: String,
    min: 1,
    max: 20,
    denyUpdate: true
  }  
});

Schemas.Hashtag = new SimpleSchema([Schemas.Hashtagname, {
  submitted: {
    type: Date,
    denyUpdate: true
  },
  loc: {
    type: GeocoordsSchema,
    denyUpdate: true
  },
  preview: {
    type: String,
    min: 3,
    max: 40,
    denyUpdate: true
  }
}]);

Hashtag.attachSchema(Schemas.Hashtag);

