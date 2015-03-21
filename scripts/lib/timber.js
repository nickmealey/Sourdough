define(['jquery', 'domReady!'], function($) {
  // Helper functions
  function replaceUrlParam(url, paramName, paramValue) {
    var pattern = new RegExp('('+paramName+'=).*?(&|$)'),
        newUrl = url;
    if (url.search(pattern) >= 0) {
      newUrl = url.replace(pattern,'$1' + paramValue + '$2');
    } else {
      newUrl = newUrl + (newUrl.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue;
    }
    return newUrl;
  }

  // Timber functions
  window.timber = window.timber || {};

  timber.cacheSelectors = function () {
    timber.cache = {
      // General
      $html                    : $('html'),
      $body                    : $('body'),
      
      // Customer Pages
      $recoverPasswordLink     : $('#RecoverPassword'),
      $hideRecoverPasswordLink : $('#HideRecoverPasswordLink'),
      $recoverPasswordForm     : $('#RecoverPasswordForm'),
      $customerLoginForm       : $('#CustomerLoginForm'),
      $passwordResetSuccess    : $('#ResetSuccess')
    }
  };

  timber.init = function () {
    timber.cacheSelectors();
    timber.loginForms();
  };
  
  timber.getHash = function () {
    return window.location.hash;
  };

  timber.loginForms = function() {
    function showRecoverPasswordForm() {
      timber.cache.$recoverPasswordForm.show();
      timber.cache.$customerLoginForm.hide();
    }

    function hideRecoverPasswordForm() {
      timber.cache.$recoverPasswordForm.hide();
      timber.cache.$customerLoginForm.show();
    }

    timber.cache.$recoverPasswordLink.on('click', function(evt) {
      evt.preventDefault();
      showRecoverPasswordForm();
    });

    timber.cache.$hideRecoverPasswordLink.on('click', function(evt) {
      evt.preventDefault();
      hideRecoverPasswordForm();
    });

    // Allow deep linking to recover password form
    if (timber.getHash() == '#recover') {
      showRecoverPasswordForm();
    }
  };

  timber.resetPasswordSuccess = function() {
    timber.cache.$passwordResetSuccess.show();
  };

  // Initialize Timber's JS on docready
  $(timber.init);
});