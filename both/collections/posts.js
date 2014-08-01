Posts = new Meteor.Collection('posts');

Schemas.Post = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true,
    autoValue: function() {
      if(Meteor.userId())
        return Meteor.userId();
      else
        this.unset();
    }
  },
  author: {
    type: String,
    denyUpdate: true,
    autoValue: function() {
      if(Meteor.user())
        return Meteor.user().profile.name;
      else
        this.unset();    
    }
  },
  submitted: {
    type: Date,
    autoValue: function() {
      return new Date();
    },
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
    autoValue: function() {
      if(this.field('rawContent').value) {
        return this.field('rawContent').value.slice(0,37).trim() + '...';
      }     
    },
    denyUpdate: true
  },
  rawContent: {
    type: String,
    min: 3,
    max: 3000,
    autoValue: function() {
      if(this.value)
        return _.escape(this.value).trim();
      this.unset();
    },
    denyUpdate: true
  },
  linkedContent: {
    type: String,
    min: 3,
    autoValue: function() {
      if(this.field('rawContent').value) {
        return twttr.txt.autoLinkHashtags(this.field('rawContent').value);
      }      
    },
    denyUpdate: true    
  },  
  hashtag: {
    type: String,
    min: 1,
    max: 20,
    autoValue: function()  {
      if(this.value) 
        return (this.value).trim();
      this.unset();
    },
    denyUpdate: true
  },
  imageId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoValue: function() {
      if (this.isSet && Meteor.isServer) {
        var Future = Npm.require('fibers/future');
        var fut = new Future();
        
        Meteor.call('/create/getImage', this.value, function (error, result) {
          if(error) {
            this.unset();
            fut.return();
          }else {
            fut.return(result._id);
          }
        });
        return fut.wait();  
      }
    }
  },
  imageUrl: {
    type: String,
    optional: true,
    autoValue: function() {
       if(Meteor.isServer && this.field('imageId').value) {
        var Future = Npm.require('fibers/future');
        var fut = new Future();
        
        Meteor.call('/create/getImage', this.field('imageId').value, function (error, result) {
          if(error){
            this.unset();
            fut.return();
          }else {
            fut.return(result.url());
          }
        });
         
        return fut.wait();   
      }
    }
  }
});









/*
Schemas.Post = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true,
    autoValue: function() {
      if(this.isInsert) {
        if(Meteor.userId())
          return Meteor.userId();
        else
          this.unset();
      }else {
        this.unset();
      }
    }
  },
  author: {
    type: String,
    denyUpdate: true,
    autoValue: function() {
      if(this.isInsert) {
        if(Meteor.user())
          return Meteor.user().profile.name;
        else
          this.unset();
      }else {
        this.unset();
      }      
    }
  },
  submitted: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else {
        this.unset();
      }
    },
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
    autoValue: function() {
      if(this.field('rawContent').value) {
        return this.field('rawContent').value.slice(0,37).trim() + '...';
      }     
    },
    denyUpdate: true
  },
  rawContent: {
    type: String,
    min: 3,
    max: 3000,
    autoValue: function() {
      if(this.isInsert && this.isSet) {
        return _.escape(this.value).trim();
      }else {
        this.unset();
      }
    },
    denyUpdate: true
  },
  linkedContent: {
    type: String,
    min: 3,
    autoValue: function() {
      if(this.field('rawContent').value) {
        return twttr.txt.autoLinkHashtags(this.field('rawContent').value);
      }      
    },
    denyUpdate: true    
  },  
  hashtag: {
    type: String,
    min: 1,
    max: 20,
    autoValue: function()  {
      if(this.isInsert && this.isSet) {
        return (this.value).trim();
      }
    },
    denyUpdate: true
  },
  imageId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  }  
});
*/

Posts.attachSchema(Schemas.Post);


