define(['jquery'], function($) {
  // Sends a message to the viewer
  return function notify(message, time) {
    
    time = time ? time : 3000;
    
    var notify = $('.notify');
    
    function open(message) {
      notify.html(message).addClass('active');
    }
    
    function close() {
      notify.removeClass('active');
    }
    
    open(message);
    
    setTimeout(close, time);
  };
});