define(['jquery', 'timber'], function($) {
  $('.reset-password-button').click(function(event) {
    event.preventDefault();
    
    if (confirm("Are you sure you want to reset your password?")) {
      
      var form = $('.reset-password form');
      
      $.ajax({
        url: form.attr("action"),
        method: form.attr("method"),
        data: form.serialize(),
        success: function() {
          rhino.notify("We sent an email to {{ customer.email }} to reset your password.", 5000);
        },
        error: function(response) {
          if (response.status == 429) {
            alert("You've tried to reset your password too many times. Please wait 10 minutes.");
          } else {
            alert("Something went wrong and we couldn't reset your password.");
          }
          
        }
      })
    }
  });
  
  
});