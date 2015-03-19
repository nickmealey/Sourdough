define(['jquery', 'instafeed', 'mustache', 'domReady!'], function($, Instafeed, Mustache) {
  var instafeedContainer = $('#instafeed');
  if (instafeedContainer.length) {
    (function(){
      
      // Fills with new images
      function fillFeed(response) {
        
        // Maintain the same height
        instafeedContainer.height(instafeedContainer.height()); // Hard set the height
        
        instafeedContainer.empty();
        
        $(response.data).each(function() {
          this.image = this.images.standard_resolution.url;
          
          var bit = '<a href="{{ link }}" data-insta-link="instagram://media?id={{id}}" class="insta-bit"><img src="{{image}}" /></a>';
          
          bit = Mustache.render(bit, this);
          
          // Randomly appear the images
          var randomTime = Math.random() * 300;
          bit = $(bit).appendTo(instafeedContainer);
          setTimeout(function() {
            bit.addClass('active');
          }, randomTime);
          
        });
        
        // Reset container height to auto
        setTimeout(function(){
          instafeedContainer.height('auto');
        }, 150);
      }
      
      var instafeed = new Instafeed({
          get: 'user',
          mock: true,
          userId: 380221035,
          accessToken: '380221035.788ddfb.6a0e6a7873f34ae489e5cf75be42bcf3',
          limit: 8,
          resolution: 'standard_resolution',
          success: function(response) {
            fillFeed(response);
          }
      });

      instafeed.run();

      // Cycle through images
      setInterval(function() {
        if (instafeed.hasNext()) {
          instafeed.next();
        } else {
          instafeed.run();
        }
      }, 10000);

      $('#instafeed').on('click', '.insta-bit', function(event) {
        event.preventDefault();
        var self = $(this);
        if (Modernizr.touch) {
          if (confirm("Open with Instagram app?")) {
            window.location = self.attr('data-insta-link');
          } else {
            window.location = self.attr('href');
          }

        } else {
          window.open(self.attr('href'));
        }

      });
    })();
  }
});