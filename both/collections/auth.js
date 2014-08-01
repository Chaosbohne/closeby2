Schemas = {};

//Schema for name.
NameSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name:",
    max: 20,
    min: 3
  }  
});

//Schema for email.
EmailSchema = new SimpleSchema({
  email: {
    type: String,
    label: "E-Mail:",
    regEx: SimpleSchema.RegEx.Email
  }  
});

//Schema for password.
PasswordSchema = new SimpleSchema({
  password: {
    type: String,
    label: "Password:",
    min: 5,
    max: 40
  }
});

//Schema for geocoords.
GeocoordsSchema = new SimpleSchema({
  lng: {
    type : Number,
    decimal: true,
    min: -180,
    max: 180
  }, 
  lat: {
    type : Number,
    decimal: true,
    min: -90,
    max: 90
  }
});

Schemas.GeocoordsSchema = GeocoordsSchema;

//Schema for map data.
MapDataSchema = new SimpleSchema({  
  boundingLocs: {
    type: [GeocoordsSchema],
    minCount: 2,
    maxCount: 2
  },
  centerLoc: {
    type: GeocoordsSchema
  },
  zoomLevel: {
    type : Number,
    decimal: false,
    min: 2,
    max: 20
  }
});

Schemas.DiscoverMapDataSchema = new SimpleSchema({
  discoverLocs: {
    type : MapDataSchema
  }
});

Schemas.DefaultMapDataSchema = new SimpleSchema({
  defaultLocs: {
    type : MapDataSchema
  }  
})

//Used on client, because on submit is MapData still undefined.
Schemas.signUpAuthClient = new SimpleSchema([
  NameSchema,
  EmailSchema,
  PasswordSchema
]);

//Used on client, full validation with all properties. MapData is in onSubmit callback set.
Schemas.signUpAuthClientServer = new SimpleSchema([
  NameSchema,
  EmailSchema,
  PasswordSchema,
  Schemas.DefaultMapDataSchema
]);

//Used on server, no password check, because this is already hashed.
Schemas.signUpAuthServer = new SimpleSchema([
  NameSchema,
  EmailSchema,
  Schemas.DefaultMapDataSchema
]);

//Used on client to login user.
Schemas.signInAuth = new SimpleSchema([
  EmailSchema,
  PasswordSchema
]);