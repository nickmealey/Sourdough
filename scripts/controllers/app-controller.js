define(['jquery', 'dyno.helper', 'domReady!'], function($, Dyno) {
  // Application-wide JS
  
  // Mobile menu
  var siteNav = $('.site-nav');
  $('.mobile-menu-button').click(function() {
    siteNav.toggleClass('active');
  });
  
  // Set content height to push footer
  $('#main').css('min-height', $(window).height() - 150);
});