// Define config
requirejs.config({
  baseUrl: Shopify.baseAssetUrl.path,
  urlArgs: Shopify.baseAssetUrl.version,
  shim: {
    'underscore': {
      exports: '_'
    },
    'jquery-ui': {
      deps: ['jquery']
    },
    'instafeed': {
      exports: 'Instafeed'
    }
  }
});

require(['jquery-ui', 
         'cart.controller', 
         'app-controller',
         'immersion'], 
  function(undefined, cart) {
  cart.update();
});