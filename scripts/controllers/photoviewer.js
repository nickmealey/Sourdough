define(['jquery'], function($) {
  var display = $('.display-photo');
  var photos = $('.product-photo-thumbs');
  
  function show(photo){
    photos.find('.active').removeClass('active');
    photo.addClass('active');
    display.attr('src', photo.attr('data-large-url'));
  }
  
  function next(){
    var photo = photos.find('.active').next();
    
    if(photo.is('img')){
      show(photo);
    } else {
      show(photos.find("img").first());
    }
  }
  
  function prev(){
    var photo = photos.find('.active').prev();
    if(photo.is('img')){
      show(photo);
    } else {
      show(photos.find("img").last());
    }
  }
  
  // Key events
  $(document).keyup(function(event){
      switch(event.which){
          // Go forward
          case 39: // Right arrow
            next();
            break;

          // Go back
          case 37: // Left arrow
            prev();
            break;
      }
  });
  
  // Photoviewer
  $('.product-photo-thumbs img').click(function(){
    rhino.photoviewer.show($(this));
  });
  
  $('.product-photos .back-photo').click(function(){
    rhino.photoviewer.prev();
  });
  
  $('.product-photos .forward-photo').click(function(){
    rhino.photoviewer.next();
  });
});