"use strict";

// Only run in browser
if (typeof document === 'undefined') {
  console.log('This script only run in browsers.');
  return;
}

// Private properties
var _options = {
  url: '/favicon.ico',
  color: '#eb361e'
};
var _generatedFavicon;
var _iconElement;

// Provate methods
var _addFavicon = function(src) {
  var head = document.getElementsByTagName('head')[0];
  _iconElement = document.createElement('link');
  _iconElement.type = 'image/x-icon';
  _iconElement.rel = 'icon';
  _iconElement.href = src;

  // remove existing favicons
  var links = document.getElementsByTagName('link');
  for(var i=0, len=links.length; i < len; i++) {
		var exists = (typeof(links[i]) !== 'undefined');
		if (exists && (links[i].getAttribute('rel') || '').match(/\bicon\b/)) {
			head.removeChild(links[i]);
		}
	}

  head.appendChild(_iconElement);
};

var _generateIcon = function(src, color, cb) {
  var img = document.createElement('img');
  img.src = src;

  img.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    var context = canvas.getContext('2d');
    context.clearRect(0, 0, img.width, img.height);
    context.drawImage(img, 0, 0);

    var centerX = img.width - (img.width / 4);
    var centerY = img.height - (img.height / 4);
    var radius = img.width / 4;

    context.fillStyle = color;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();

    cb(null, context.canvas.toDataURL());
  };
}

var FaviconNotification = {
  init: function(options) {
    if (options) {
      Object.keys(options).map(function(option){
        _options[option] = options[option];
      });
    }

    _generateIcon(_options.url, _options.color, function(err, url){
      _generatedFavicon = url;
    });

    _addFavicon(_options.url);

  },

  add: function() {
    if (!_generatedFavicon && !_iconElement) {
      _generateIcon(_originalFavicon, _options.color, function(err, url) {
        _generatedFavicon = url;
        _addFavicon(url);
      });
    } else {
      _iconElement.href = _generatedFavicon;
    }

  },

  remove: function() {
    _iconElement.href = _options.url;
  }
};

module.exports = FaviconNotification;
