define(['jquery', 'domReady!'], function($) {
  // Size immersion modules properly
  var immersion = $('.immersion');
  
  if (immersion.length) {
    function sizeImmersion(){
      immersion.each(function() {
        var scale = $(this).attr('data-scale-y');
        if (scale) {
          $(this).height($(window).height() * scale);
        } else {
          $(this).height($(window).height());
        }
      });
    }

    sizeImmersion();

    $(window).resize(function(){
      sizeImmersion();
    });

    // Add immersion for header
    var immersiveHeader = $('body.template-index')
                          .find('header')
                          .addClass('immersive-header');

    // Add dark class if needed
    if($('.immersion:first').hasClass('white-header')){
      immersiveHeader.addClass('light');
    }
    
    // Add loading for videos
    $('.immersion video').each(function() {
      if (this.readyState < 4) {
        this.oncanplay = function() {
          console.log("Play away!");
          $(this).addClass('loaded');
        }
      } else {
        $(this).addClass('loaded');
      }
    });
  }
});