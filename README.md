# Favicon Notification
#### A small script to add notification bubble to favicon

## Favicon

If you don't have a nice favicon set on app, read this: [https://github.com/audreyr/favicon-cheat-sheet](https://github.com/audreyr/favicon-cheat-sheet)

## Installing

Install using NPM:

```
npm install favicon-notification --save
```

## Using

```js
var FaviconNotification = require('favicon-notification');

// When your app loads
FaviconNotification.init({
  color: '#000000'
});

// On some event
FaviconNotification.add();

// If you want to remove the notification
FaviconNotification.remove();
```

## Methods

## .init(options)

This script assumes that you have a `/favicon.ico` set. [See how setup your favicon](https://github.com/audreyr/favicon-cheat-sheet). If are you using another path to your favicon, you can set it by passing some options to this method. You can set a different color too (default is red).

```js
FaviconNotification.init({
  url: '/path/to/favicon.ico',
  color: '#FFFFFF'
});
```

## .add()

As the name says, this add the notification bubble to the favicon. If you didn't initialized the script, this will use the default options to create and set the new favicon.

```js
FaviconNotification.add();
```
## .remove()

```js
FaviconNotification.remove();
```
