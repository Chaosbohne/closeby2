/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
  
  getMapOptions : function() {
    var gmapStyles = [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];  

    return {
      zoom: 8,
      maxZoom: 20,
      minZoom: 2,
      panControl: false,
      zoomControl: false,
      scaleControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: gmapStyles
    };      
  },
  // http://jsfiddle.net/WeWy7/3/
  m_SelectionSave : function (containerEl) {
    var m_Document = containerEl.ownerDocument;
    var rv = { start: 0, end: 0 };

    if (m_Document.getSelection && m_Document.createRange) {
      try {
        var range = m_Document.getSelection().getRangeAt(0);
        var preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(containerEl);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        rv.start = preSelectionRange.toString().length;
        rv.end = rv.start + range.toString().length;
      } catch (e) { }
    } else if (m_Document.selection && m_Document.body.createTextRange) {
      var selectedTextRange = m_Document.selection.createRange();
      var preSelectionTextRange = m_Document.body.createTextRange();
      preSelectionTextRange.moveToElementText(containerEl);
      preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
      rv.start = preSelectionTextRange.text.length;
      rv.end = rv.start + selectedTextRange.text.length;
    }

    return rv;
  },
  m_SelectionRestore : function (containerEl, savedSel) {
    if (savedSel === null || savedSel === undefined) return false;

    var m_Document = containerEl.ownerDocument;
    var m_Window = 'defaultView' in m_Document ? m_Document.defaultView : m_Document.parentWindow;

    if (m_Window.getSelection && m_Document.createRange) {
      var charIndex = 0, range = m_Document.createRange();
      range.setStart(containerEl, 0);
      range.collapse(true);
      var nodeStack = [containerEl], node, foundStart = false, stop = false;

      while (!stop && (node = nodeStack.pop())) {
        if (node.nodeType == 3) {
          var nextCharIndex = charIndex + node.length;
          if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
            range.setStart(node, savedSel.start - charIndex);
            foundStart = true;
          }
          if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
            range.setEnd(node, savedSel.end - charIndex);
            stop = true;
          }
          charIndex = nextCharIndex;
        } else {
          var i = node.childNodes.length;
          while (i--) {
            nodeStack.push(node.childNodes[i]);
          }
        }
      }

      var sel = m_Window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (m_Document.selection && m_Document.body.createTextRange) {
      var textRange = m_Document.body.createTextRange();
      textRange.moveToElementText(containerEl);
      textRange.collapse(true);
      textRange.moveEnd("character", savedSel.end);
      textRange.moveStart("character", savedSel.start);
      textRange.select();
    }
  },
  autoLinkHashtagsWithCursor: function(target) {
    //save cursorposition
    savedSelection = App.m_SelectionSave( target );    
    
    var html = $(target).html();
    html = App.autoLinkHashtags(html);
    $(target).html(html);
    
    //restore cursor
    if (savedSelection) {
      App.m_SelectionRestore(target, savedSelection);
    }       
  },
  autoLinkEscaption: function(html) {
    var newlineReplaced = html.replace(/<br>/g,'\n');
    var div = document.createElement("div");
    div.innerHTML = newlineReplaced;
    var stripped = div.textContent || div.innerText || "";
    var escaped = _.escape(stripped);
    return escaped;
  },
  autoLinkHashtags : function(html){
    var escaped = App.autoLinkEscaption(html);
    var linked = twttr.txt.autoLinkHashtags(escaped);
    var newlineRestored = linked.replace(/\n/g,'<br>');
    return newlineRestored;
  }
});


App.helpers = {
  getDate : function(submitted) {
    var now = new Date();

    var timeDiff = Math.abs(now.getTime() - submitted.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 60)); 
    
    if(diffDays < 60) {
      return diffDays + 'm';
    }else {
      diffDays = Math.ceil(diffDays / (60));   
      if((diffDays) < 24) {
        return diffDays + 'h';
      }else {
        diffDays = Math.ceil(diffDays / (24));
        return diffDays + 'd';      
      }
    }
  },
  
  equals : function(para1, para2) {
    return para1 === para2;
  },
  
  lowerEqual : function(para1, para2) {
    return (para1 <= para2) ? true : false;
  },
  
  greaterEqual: function(para1, para2) {
    return (para1 >= para2) ? true : false;
  }
  
  
};

_.each(App.helpers, function (helper, key) {
  UI.registerHelper(key, helper);
});

Meteor.startup(function() {
  map = null;
  savedSelection = null;
  isVisibleKey = false;
  extendMapFunctions();
  
  //For Stream posts / hashtags etc.
  subcrBeginDate = null;
  
  //save create content on pagechange
  createHashtagContent = '';
  
  
  Session.setDefault('routingHashtagsLimit', null);
  Session.setDefault('amountOfNewHashtags', 0);
});

extendMapFunctions = function() {
  google.maps.Map.prototype.Resize = function() {
    var mapWidth = $('#MapIndex').width();
    $('#MapWrapper').height(mapWidth);  
    $('#MapWrapper').width(mapWidth);  
  },
    
  /* Add advanced properties to GMAPS-Object, to handle markers */   
  google.maps.Map.prototype.markers = new Array();
  
  google.maps.Map.prototype.addMarker = function(marker) {
    this.markers[this.markers.length] = marker;
  };
  
  google.maps.Map.prototype.getMarkers = function() {
    return this.markers
  };
  
  google.maps.Map.prototype.clearMarkers = function() {
    for(var i=0; i<this.markers.length; i++){
      this.markers[i].setMap(null);
    }
    this.markers = new Array();
  };    
}

