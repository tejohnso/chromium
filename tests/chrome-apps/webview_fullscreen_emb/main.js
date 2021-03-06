var $ = function(id) { return document.getElementById(id); };
var LOG = function(msg) { window.console.log(msg); };

var lastErrorEvent;

var init = function() {
  document.onwebkitfullscreenerror = function(e) {
    LOG('Embedder: onwebkitfullscreenerror: ' + e);
    lastErrorEvent = e;
  };
  document.onwebkitfullscreenchange = function(e) {
    LOG('Embedder: onwebkitfullscreenchange: ' + e);
  };
};

var goFullscreen = function(opt_elem) { LOG('Embedder go fullscreen');
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    // alternative standard method
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {               // current working methods
    var elem = opt_elem || document.documentElement;
    if (elem.requestFullScreen) {
      elem.requestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
};

var exitFullscreen = function(opt_elem) {
  var elem = opt_elem || document.documentElement;
  if (elem) {
    //LOG('call elem.webkitCancelFullScreen()');
    //elem.webkitCancelFullScreen();
    LOG('call document.webkitCancelFullScreen()');
    document.webkitCancelFullScreen();
  }
};

window.onload = function() {
  init();
  $('e-button').onclick = function(e) {
    var elem = document.getElementById('efullscreen');
    goFullscreen(elem);
    //goFullscreen(elem);
  };
  $('w-button').onclick = function(e) {
    var elem = document.querySelector('webview');
    elem.style.width = '100%';
    elem.style.height = '100%';
    goFullscreen(elem);
  };
  $('e-cancel-button').onclick = function(e) {
    exitFullscreen($('efullscreen'));
  };
  LOG('registered click');


  var webview = document.querySelector('webview');
  if (!webview) {
    LOG('no webview');
  } else {
    webview.addEventListener('permissionrequest', function(e) {
      LOG('permissionrequest');
      LOG('permission: ' + e.permission);
      // Now make the embedder itself go fullscreen.
//      window.console.log('first, exit fullscreen');
//      exitFullscreen();
//      window.console.log('make embedder\'s webview fullscreen too');
//      goFullscreen(webview);

      e.request.allow();
    });
  }
};
