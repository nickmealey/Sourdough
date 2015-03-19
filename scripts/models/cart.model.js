define(['jquery', 'underscore'], function($, _) {
  // Cart response data
  var data;
  
  function retrieveContents() {
    return data;
  }
  
  // Retrieve cart contents
  function get(callback, forceFetch){
    if(!callback){
      throw("error: no callback given.");
      return false;
    }
    // If there's no data, go get some
    if(!data || forceFetch){
      data = { fetching: true };
      $.getJSON("/cart.json", function(response){
        data = response;
        if(callback){
          callback(data);
        }
        return data;
      });
    } else {
      // If we're still fetching data, wait for data to come
      function waitForData(){
        if(data.fetching){
          setTimeout(waitForData, 10);
        } else {
          callback(data);
        }
      }
      
      waitForData();
    }
  }
  
  // Adds a product to the cart
  function add(form, callback) {
    if(!callback){
      throw("error: no callback given.");
      return false;
    }
    
    $.ajax({
      url: form.action,
      method: "post",
      data: $(form).serialize(),
      success: function(response) {
        callback(response);
      },
      error: function() {
        throw("could not update cart.");
      }
    });
  }
  
  // Public methods
  return {
    get: get,
    add: add,
    contents: retrieveContents
  };
});