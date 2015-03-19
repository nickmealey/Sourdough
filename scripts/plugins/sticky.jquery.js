define(['jquery'], function($) {
  // Helper for sticky plugin
  var sticky = function(){
      
      // Keep an array of objects that should stick
      var bin = [];
      
      function publicGetBin(){
          return bin;
      }
      
      // Create a new object and establish a handler(what get gets fired onscroll)
      function publicCreateItem(elem, options){
        var self = $(elem);
        
        // Set id's
        var id = bin.length + 1;
        this.id = id;
        self.data("id", id);
        
        // Position of the element
        var top = self.offset().top - options.offset;
        
        // This itemout recalculates the offset, giving elements time to load
        setTimeout(function(){
            top = self.offset().top - options.offset;
        }, 50);
        
        function stick(){
          if(!self.hasClass('stuck')){
            // position:relative, top:0
            self.addClass('stuck');

            if(options.fadeIn){
                self.hide().slideDown('fast');
            }
          }
        }
        
        function unstick(){
            // remove position:relative, top:0
            self.removeClass('stuck');
        }
        
        // Check intially if the item should stick. The timeout helps for accuracy
        setTimeout(function(){
            if(top < $(window).scrollTop()){
                stick();
            }
        }, 50)
        
        this.handler = function(){
          var scroll = $(window).scrollTop();
          if(top < scroll) stick();
          else unstick();
        };
        
        // Add this object to the bin
        bin.push(this);
      }
      
      return {
          Item: publicCreateItem,
          get: publicGetBin
      }
  }();
  
  // Make something fixed to the window
  $.fn.sticky = function(options){
    // Default options
    var defaults = {
        offset: 0,
        fadeIn: false
    };

    var options = $.extend({}, defaults, options);
    var item = new sticky.Item(this, options);
    
    $(window).bind('scroll.sticky', item.handler);
    
    return this;
  };

  // Unstick
  $.fn.unsticky = function(){
    var self = this;
    
    // Look through each item and find a match, then unbind the scroll event
    $(sticky.get()).each(function(){
      if(this.id == self.data().id){
        $(window).unbind('scroll.sticky', this.handler);
        this.unstick();
      }
    });
  };
});