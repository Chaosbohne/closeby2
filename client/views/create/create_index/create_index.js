
/*****************************************************************************/
/* CreateIndex: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.CreateIndex.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
  
  'change #addImage': function(event, template) {
    //Go throw each file, but return after first file is parsed
    FS.Utility.eachFile(event, function(file) {    

      //Some typechecks
      //TAKE CARE: These checks have to be same as in collection!
      var error = null;
      
      if(file.size > 3145728) {
        error = {hasError: true, reason: 'Please choose an image smaller than 3MB!'};
        Session.set('ImageError', error);
        return false;
      }

      //check filetype
      if(!file.type.match('image/*')) {
        error = {hasError: true, reason: 'Please choose an image!'};
        Session.set('ImageError', error);
        return false;        
      }

      function hasExtension(fileName, exts) {
        return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
      }      

      //check extensions
      if (!hasExtension(file.name, ['.jpg', '.png', '.JPG', '.PNG'])) {
        error = {hasError: true, reason: 'Just jpg and png are allowed!'};
        Session.set('ImageError', error);
        return false;        
      }      

      //Filter options passed -> generate preview image
      var reader = new FileReader();
      
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        var image = { 'src' : e.target.result, 'title': escape(theFile.name) };
        Session.set('selectedUploadImageThumb', image);     
        Session.set('ImageError', null);
      };
    })(file);
    
    // Read in the image file as a data URL.
    reader.readAsDataURL(file);          
      
    });
  },
  
  'keypress [name=hashtag]': function(event, template) {
    var input = template.find('[name=hashtag]').value;
    if( (input.length + 1) > Schemas.Hashtagname._schema.name.max) {
      event.preventDefault();
      return false;
    }    
  },
  
  'keydown [name=hashtag]': function(event, template) {   
    if(event.keyCode === 32){
      event.preventDefault();
      return false;
    }    
  },
  
  'keyup [name=hashtag]' : function(event, template) {
    var input = template.find('[name=hashtag]').value;
    var length = input.length;

    if(_.isNumber(length)) {
      Session.set('createHashtagContainer', Schemas.Hashtagname._schema.name.max -  length);
      createHashtagContent = input;
    }
  },
  
  'keyup [name=rawContent]' : function(event, template) {
    var input = template.find('[name=rawContent]').value;
    var length = input.length;

    if(_.isNumber(length)) {
      Session.set('createRawContentContainer', Schemas.Post._schema.rawContent.max -  length);
    }
  }
});

Template.CreateIndex.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
  /* if true there are validation errors */
  hasImageValidationError: function() {
    return Session.get('ImageError');
  },  
  
  selectedUploadImageThumb: function() {
    return Session.get('selectedUploadImageThumb');
  },
  
  remaingHashtagLetters: function() {
    return Session.get('createHashtagContainer');
  },
  
  remainingContentLetters: function() {
   return Session.get('createRawContentContainer');
  },

  hashtagValueFromLastSession: function() {
    return createHashtagContent || '';
  },  
  
  minHashtagLength: function() {
    return Schemas.Hashtagname._schema.name.min;
  },
  
  maxHashtagLength: function() {
    return Schemas.Hashtagname._schema.name.max;
  },
  
  onCreateSubmit: function() {
   return Session.get('onCreateSubmit') || false;    
  }
});

/*****************************************************************************/
/* CreateIndex: Lifecycle Hooks */
/*****************************************************************************/
Template.CreateIndex.created = function () {
  if(!Session.get('createHashtagContainer')) 
    Session.set('createHashtagContainer', Schemas.Hashtagname._schema.name.max);
  
  Session.set('createRawContentContainer', Schemas.Post._schema.rawContent.max);
  
  var handle = Deps.autorun(function () {
    var loc = Session.get('MapClickedLoc');
    if(loc && Match.test(loc, Schemas.GeocoordsSchema) && map) {
      map.clearMarkers();
      var latLng = new google.maps.LatLng(loc.lat, loc.lng);
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
      map.addMarker(marker);              
    }
  });
  
  this.handle = handle;  
};

Template.CreateIndex.rendered = function () {
};

Template.CreateIndex.destroyed = function () {
  this.handle.stop();
  map.clearMarkers();
};

AutoForm.hooks({
  postForm: {
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
      
      var customHandler = function(insertDoc) {
        var image = Session.get('selectedUploadImageThumb');  
        if(image) {
          var fsFile = new FS.File(image.src);
          fsFile.metadata = {owner: Meteor.userId()};      
          
           Images.insert(fsFile, function (err, fileObj) {
             if(err) {
              error = {hasError: true, reason: err.reason};
              Session.set('ImageError', error);               
             }
  
            //Save the imageId and Url to the userCollection just in case the upload was completed
            Deps.autorun(function (computation) {
              //Subscribe to the image that should be added
              //This causes Deps to rerun everytimes the handle changes
              var subscriptionHandle = Meteor.subscribe('image', fsFile._id);

              //Get the image from subscription
              var img = Images.findOne({_id : fsFile._id });

              //If there is an image
              if(img) {
                //And the image already has an url
                //The image gets the url first when the upload is completed
                //reactive data source, so this reruns Deps

                if(img.url()){
                  //If the call was send whether there was an error or not
                  //the computation and subscription should stop
                  computation.stop();
                  subscriptionHandle.stop();                
                  insertDoc = _.extend(insertDoc, {imageId : img._id});
                  Posts.insert(insertDoc);
                  clearSession(insertDoc.hashtag);
                }
              }       
            });               
             
           });
        }else {
          Posts.insert(insertDoc);
          clearSession(insertDoc.hashtag);
        }
      }
      
      var that = this;
      var clearSession = function(hashtag) {
        that.resetForm();
        Session.set('ImageError', null);
        Session.set('selectedUploadImageThumb', null);  
        createHashtagContent = '';
        Session.set('remainingHashtagLetters', Schemas.Hashtagname._schema.name.max -  length);
        Session.set('remaininContentLetters', Schemas.Post._schema.rawContent.max -  length);
        Session.set('onCreateSubmit', false);  
        that.done();
        Router.go('posts.index', {name: hashtag});
      }
      
      Session.set('onCreateSubmit', true);
      
      customHandler(insertDoc);
      return false;
    },

    // Called when any operation succeeds, where operation will be
    // "insert", "update", "remove", or the method name.
    onSuccess: function(operation, result, template) {
      console.log(operation);
      console.log(result);
      console.log(template);
    }, 

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error, template) {
      console.log(operation);
      console.log(error);
      console.log(template);      
    },

    formToDoc: function(doc, ss, formId) {
      _.extend(doc, {loc : Session.get("MapClickedLoc")});  
      return doc;
    },
    
    // Called at the beginning and end of submission, respectively.
    // This is the place to disable/enable buttons or the form,
    // show/hide a "Please wait" message, etc. If these hooks are
    // not defined, then by default the submit button is disabled
    // during submission.
    beginSubmit: function(formId, template) {
    },
    endSubmit: function(formId, template) {
    }
  }
});



