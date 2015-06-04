var jQuery = require('jquery');
var FaviconNotification = require('favicon-notification');

jQuery(document).ready(function($) {
  FaviconNotification.add();

  // FaviconNotification.init({
  //   url: 'favicons/github.ico'
  // });

  $('.btn-github').bind('click', function(e) {
    FaviconNotification.init({
      url: 'favicons/github.ico'
    });
  });

  $('.btn-stack-overflow').bind('click', function(e) {
    FaviconNotification.init({
      url: 'favicons/stackoverflow.ico',
      color: '#00c96f',
      lineColor: '#70f0b7'
    });
  });

  $('.btn-google').bind('click', function(e) {
    FaviconNotification.init({
      url: 'favicons/google.ico',
      color: '#ffc700',
      lineColor: '#feecad'
    });
  });

  $('.btn-success').bind('click', function(e) {
    FaviconNotification.add();
  });

  $('.btn-danger').bind('click', function(e) {
    FaviconNotification.remove();
  });

});
