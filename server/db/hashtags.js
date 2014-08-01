if(Hashtag.find().count() === 0) {
  
  
  Hashtag._ensureIndex( { loc : "2d" } );
  //For all points, if you use longitude and latitude, store coordinates in longitude, latitude order.
  
  /* Fixturing is with the new collection2 not working anymore */
  console.log('fixturing hashtags');

/*
  var date = new Date();
  
  var hashtag = {
    submitted: date,
    loc: { lng : 13.739251, lat : 51.049893  },
    name: "first",
    preview: "my first"
  };
  Hashtag.insert(hashtag);
  
  hashtag = {
    submitted: date,
    loc: {  lng : 13.739241, lat : 51.049883 },
    name: "second",
    preview: "my second"
  }; 
  Hashtag.insert(hashtag);

  hashtag = {
    submitted: date,
    loc: {  lng : 13.716977, lat : 51.055727 },
    name: "nearpoint1",
    preview: "my nearpoint1"
  };  
  Hashtag.insert(hashtag);
  
  date = new Date(2000, 0, 1, 0, 0, 0);
  
  hashtag = {
    submitted: date,
    loc: {  lng : 13.716967, lat : 51.055737 },
    name: "nearpoint1",
    preview: "my nearpoint1"
  };  
  Hashtag.insert(hashtag);
  
  hashtag = {
    submitted: date,
    loc: {  lng : 13.716957, lat : 51.055747 },
    name: "nearpoint1",
    preview: "my nearpoint1"
  };    
  Hashtag.insert(hashtag);
  
  hashtag = {
    submitted: date,
    loc: {  lng : 13.715422, lat : 51.056384 },
    name: "nearpoint2",
    preview: "my nearpoint2"
  }; 
  Hashtag.insert(hashtag);
  
  hashtag = {
    submitted: date,
    loc: {  lng : 13.716624, lat : 51.056654 },
    name: "nearpoint3",
    preview: "my nearpoint3"
  };    
  Hashtag.insert(hashtag);
  
  date = new Date();
  hashtag = {
    submitted: date,
    loc: {  lng : 13.714006, lat : 51.058124 },
    name: "latestpoint1",
    preview: "my latestpoint1"
  };  
  Hashtag.insert(hashtag);
  
  hashtag = {
    submitted: date,
    loc: {  lng : 13.712268, lat : 51.054320},
    name: "latestpoint2",
    preview: "my latestpoint2"
  }; 
  Hashtag.insert(hashtag);
  
  hashtag = {
    submitted: date,
    loc: {  lng : 13.723040, lat : 51.057679 },
    name: "latestpoint3",
    preview: "my latestpoint3"
  };    
  Hashtag.insert(hashtag);
  */
}