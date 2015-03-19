define(function() {
  // Dyno captures how long it takes to do something
  window.DynoLogger = function(callback, context){
    var start = new Date().getTime();
    callback.call(context);
    var end = new Date().getTime();
    console.log(callback.name + " dyno'd at " + (end - start) + "ms, say hello to your mother for me.")
  };
});