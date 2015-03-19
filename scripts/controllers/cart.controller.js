define(function(require) {
  // Dependencies
  var $ =               require('jquery'),
      _ =               require('underscore'),
      Mustache =        require('mustache'),
      Cart =            require('cart.model'),
      Money =           require('money'),
      TriggerEvents =   require('trigger-events'),
      Notify =          require('notify');
      
                        // DOM Ready
                        require('domReady!');
                 
  // DOM Elements
  var menu = $('.quick-cart');
  var menuTemplate = menu.clone();
  var cartButton = $('.cart-button');
  var cartCount = $('.cart-count');
  var header = $('.site-header');
  var disableQuickCart = $('.dominant-cart').is(':visible');
  
  // Updates the menu
  function update(callback){
   Cart.get(function(data){

     // If there's no items, show a message
     if(data.item_count < 1){
       data.cart_is_empty = "empty-cart";
     }

     // Don't show quantity if there isn't any
     _.each(data.items, function(item, index){
       item.quantity = item.quantity > 1 ? "("+item.quantity+")" : ""
     });

     var menuOutput = Mustache.render(menuTemplate.html(), data);
     
     // Output formatted text
     menu.removeClass('loading').html(menuOutput);
     
     // Format prices to money
     menu.find('.price').each(function() {
       
       $(this).text(Money.format($(this).text()));
     });
     

     // Update cart count
     if(data.item_count > 0){
       cartCount.addClass('visible').text(data.item_count);
     }

     // Callback
     if(callback){
       callback(data);
     }
   }, true);
  }

  // Shows the menu
  function show(){
   if(!disableQuickCart) {
     window.scrollTo(0, 0);
     cartButton.addClass('active');
     menu.slideDown(150);
     header.addClass('active');
   } else {
     menu.find('.cart-contents').hide().fadeIn()
   }
  }

  // Hides the menu
  function hide() {
   cartButton.removeClass('active');
   menu.slideUp(150);
   header.removeClass('active');
  }

  // Retrieve items that have the "pre-cart" tag
  function preCartItems(callback) {
    
    var deferred = $.Deferred();

    // A collection of items
    var products = [];

    // Get the cart contents
    Cart.get(function(response) {
 
     var requests = _.map(response.items, function(product) {
       return $.getJSON("/products/" + product.handle + ".json", function(response) {
         console.log(response);
         var product = response.product;
         product.tags= product.tags.replace(/ /g, "").split(",");
         if (_.contains(product.tags, "pre-cart")) {
            // Add product to array
            products.push(product);
          }
       });
     });
 
     $.when.apply(undefined, requests).then(function() {
       callback(products);
       deferred.resolve();
     });
 
    }); // End get cart

    return deferred;

  } // End preCart
  
  // Show cart on click, don't activate if dominate cart is visible
  if(!disableQuickCart){
    cartButton.click(function(event){
      event.preventDefault();
      
      // Check if the menu's open already
      if(menu.is(":visible")){
        hide();
      } else {
        show();
      }

    });
    
    // Check for any pre-cart items
    $(document).on('click', '.checkout-button', function(event) {
      event.preventDefault();

      var button = $(this);
      // Check for related products
      preCartItems(function(products) {
        if (products.length) {
          window.location = window.location.origin + "/pages/related-products";
        } else {
          window.location = window.location.origin + button.attr('href');
        }
      });
    }); // End checkout click
    
    // Add quick cart to events, trigger events are for tracking
    // document clicks
    TriggerEvents.add("quick-cart", cartButton.add(menu), function(){
      if(menu.is(':visible')){
        hide();
      }
    });
    
  } // End if disabled cart
  
  // Add to cart button
  $(document).on('submit', '.add-to-cart', function(event){
    event.preventDefault();
    
    Cart.add(this, function(){
      update(function() {
        show();
        Notify("Your cart has been updated.");
      });
    });
  });
   
  return {
   update: update,
   show: show,
   hide: hide,
   preCartItems: preCartItems
  }
});