(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.FaviconNotification = factory();
  }
}(this, function() {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.

    // Only run in browser
    if (typeof document === 'undefined') {
      console.log('This script only run in browsers.');
      return;
    }

    // Private properties
    var _options = {};

    var _defaults = {
      url: '/favicon.ico',
      color: '#eb361e',
      lineColor: '#ffffff'
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

    var _generateIcon = function(cb) {
      var img = document.createElement('img');
      img.src = _options.url;

      img.onload = function() {
        var lineWidth = 2;
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        var context = canvas.getContext('2d');
        context.clearRect(0, 0, img.width, img.height);
        context.drawImage(img, 0, 0);

        var centerX = img.width - (img.width / 4.5) - lineWidth;
        var centerY = img.height - (img.height / 4.5) - lineWidth;
        var radius = img.width / 4.5;

        context.fillStyle = _options.color;
        context.strokeStyle = _options.lineColor;
        context.lineWidth = lineWidth;

        context.beginPath();
        context.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
        context.stroke();

        cb(null, context.canvas.toDataURL());
      };
    };

    var _setOptions = function(options) {
      if (!options) {
        _options = _defaults;
        return;
      }

      _options = {};

      for(var key in _defaults){
           _options[key] = options.hasOwnProperty(key) ? options[key] : _defaults[key];
      }
    };

    var FaviconNotification = {
      init: function(options) {

        _setOptions(options);

        _generateIcon(function(err, url){
          _generatedFavicon = url;
        });

        _addFavicon(_options.url);

      },

      add: function() {
        if (!_generatedFavicon && !_iconElement) {
          _setOptions();
          _generateIcon(function(err, url) {
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


    return FaviconNotification;


}));
