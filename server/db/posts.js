if(Posts.find().count() === 0) {
  
  
  Posts._ensureIndex( { loc : "2d" } );
  //For all points, if you use longitude and latitude, store coordinates in longitude, latitude order.
  
  /* Fixturing is with the new collection2 not working anymore */
  
  console.log('fixturing posts');

  /*
  var tomId = Meteor.users.insert({
    profile: {name: 'Tom Coleman'}
  });
  
  var sachaId = Meteor.users.insert({
    profile: {name: 'Sacha Greif'}
  });  
  
  
  var tom = Meteor.users.findOne(tomId);
  var sacha = Meteor.users.findOne(sachaId);  
  var date = new Date();
  
  
  
  var post1 = {
    userId: sachaId,
    author: sacha.profile.name,
    submitted: date,
    loc: { lng : 13.739251, lat : 51.049893  },
    rawContent: "blub blib blob bleb #first"
  };
  
  Posts.insert(post1);
  
  var post2 = {
    userId: tomId,
    author: tom.profile.name,
    submitted: date,
    loc: {  lng : 13.739241, lat : 51.049883 },
    rawContent: "bub bib bob beb #second",
  }; 
  
  Posts.insert(post2);
  
 
  
  var post3_0 = {
    userId: tomId,
    author: tom.profile.name,
    submitted: date,
    loc: {  lng : 13.716977, lat : 51.055727 },
    rawContent: "geographic near point 1 #nearpoint1"
  };     
  date = new Date(2000, 0, 1, 0, 0, 0);
  
  var post3 = {
    userId: tomId,
    author: tom.profile.name,
    submitted: date,
    loc: {  lng : 13.716967, lat : 51.055737 },
    rawContent: "geographic near point 1 #nearpoint1"
  };  
  var post3_1 = {
    userId: tomId,
    author: tom.profile.name,
    submitted: date,
    loc: {  lng : 13.716957, lat : 51.055747 },
    rawContent: "geographic #nearpoint1 near point 1"
  };    
  
  var post4 = {
    userId: tomId,
    author: tom.profile.name,
    submitted: date,
    loc: {  lng : 13.715422, lat : 51.056384 },
    rawContent: "geographic #nearpoint2 near point 2"
  }; 
  var post5 = {
    userId: tomId,
    author: tom.profile.name,
    submitted: date,
    loc: {  lng : 13.716624, lat : 51.056654 },
    rawContent: "g #nearpoint3 eographic near point 3"
  };    
  
  date = new Date();
  var post6 = {
    userId: tomId,
    author: tom.profile.name,
    submitted: date,
    loc: {  lng : 13.714006, lat : 51.058124 },
    rawContent: "geogr #latestpoint1 aphic latest point 1"
  };  
  var post7 = {
    userId: tomId,
    author: tom.profile.name,
    submitted: date,
    loc: {  lng : 13.712268, lat : 51.054320},
    rawContent: "geographic #latestpoint2  point 2"
  }; 
  var post8 = {
    userId: tomId,
    author: tom.profile.name,
    submitted: date,
    loc: {  lng : 13.723040, lat : 51.057679 },
    rawContent: "geographic latest point 3 #latestpoint3"
  };    
  Posts.insert(post3);  
  Posts.insert(post3_1);
  Posts.insert(post3_0);
  Posts.insert(post4);    
  Posts.insert(post5);    
  
  Posts.insert(post6);  
  Posts.insert(post7);    
  Posts.insert(post8); 
  */
}