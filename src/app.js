var jQuery = require('jquery');
var FaviconNotification = require('favicon-notification');

jQuery(document).ready(function($) {
  FaviconNotification.init();

  $('.btn-github').bind('click', function(e) {
    FaviconNotification.init({
      url: 'favicons/github.ico',
      color: '#41a6cc'
    });
  });

  $('.btn-stack-overflow').bind('click', function(e) {
    FaviconNotification.init({
      url: 'favicons/stackoverflow.ico',
      color: '#00c96f'
    });
  });

  $('.btn-google').bind('click', function(e) {
    FaviconNotification.init({
      url: 'favicons/google.ico',
      color: '#FFFFFF'
    });
  });

  $('.btn-success').bind('click', function(e) {
    FaviconNotification.add();
  });

  $('.btn-danger').bind('click', function(e) {
    FaviconNotification.remove();
  });

});
