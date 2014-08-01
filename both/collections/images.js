var imageStore = new FS.Store.S3("images", {
  region: "eu-west-1", //optional in most casescd w  
  bucket: "clobeimages", //required
  // The rest are generic store options supported by all storage adapters
  maxTries: 1 //optional, default 5
});

Images = new FS.Collection("images", {
  stores: [imageStore],
  filter: {
    maxSize: 3145728,
    allow: {
      contentTypes: ['image/*'],
      extensions: ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG']
    }
  },
  onInvalid: function(message) {
    console.log(message);
  }  
});

/*
var profileImagesStore = new FS.Store.S3("profileImages", {
  region: "eu-west-1", //required, or use endpoint option
  bucket: "closebyprofileimages", //required
  //ACL: myValue //optional, default is 'private'
  //beforeSave: myBeforeSaveFunction, //optional
  maxTries: 1, //optional, default 5
  transformWrite: function(fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name).strip().resize('100','100').interlace("plane").quality('80').stream().pipe(writeStream);
  }
});


ProfileImages = new FS.Collection('profileImages', {
  stores: [profileImagesStore],
  filter: {
    maxSize: 3145728,
    allow: {
      contentTypes: ['image/*'],
      extensions: ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG']
    }
  },
  onInvalid: function(message) {
    console.log(message);
  }
});


ProfileImages.allow({
  insert: function(userId, doc) {
    return (userId && doc.metadata.owner === userId);
  },
  update: function(userId, doc, fieldNames, modifier) {
    return (userId === doc.metadata.owner);
  },
  remove: function(userId, doc) {
    return false;
  },
  download: function(userId) {
    return true;
  },
  fetch: []
});*/