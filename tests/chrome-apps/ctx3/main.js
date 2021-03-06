var APP_ITEMS = false;

var LOG = function(msg) {
  window.console.log(msg);
  showLogInDiv(msg);
};
var $ = function(id) {
  return document.getElementById(id);
};

var getWebViewSrc = function() {
  return "data:text/html,<body bgcolor=blue>this is <a href='http://www.google.com'>Google link</a>guest <input type=\"text\" value=\"my value\"/></body>";
};

var showLogInDiv = function(msg) {
  document.querySelector('#log').innerText += msg + '\n';
};

window.onload = function() {
  var src = getWebViewSrc();

  var w = document.createElement('webview');
  w.id = 'webview1';

  w.addEventListener('loadstop', function(e) {
    LOG('webview1.loadstop');
  });

  w.addEventListener('systemContextMenu', function(e) {
    LOG('**** systemContextMenu ****');
    LOG('**** systemContextMenu ****');
    LOG('**** systemContextMenu ****');
    LOG('* e.items: ' + e.items);
    var len = e.items.length;
    var itemIdsToShow = [];
    for (var i = 0; i < len; ++i) {
      LOG('item ' + i);
      LOG('command_id: ' + e.items[i].command_id);
      LOG('title: ' + e.items[i].title);
      if (len > 1 && i == 1) {
        continue;
      }

      var itemToShow = {'command_id': e.items[i].command_id};
      if (i%2) itemToShow.title = 'Foobar ' + i;
      itemIdsToShow.push(itemToShow);

      //itemIdsToShow.push(e.items[i].command_id);
      //itemIdsToShow.push({'command_id': e.items[i].command_id, 'title': 'Foobar' + i});
      //itemIdsToShow.push(e.items[i]);
    }

    e.preventDefault();
    window.setTimeout(function() {
      LOG('setTimeout fire to show, calling allow()');
      // Move inspect element to the top.
      if (itemIdsToShow.length > 1) {
        var tmp = itemIdsToShow[0];
        itemIdsToShow[0] = itemIdsToShow[itemIdsToShow.length - 1];
        itemIdsToShow[itemIdsToShow.length - 1] = tmp;
      }
      // Add separator between each and every item.
      var outItems = [];
      for (i = 0; i < itemIdsToShow.length; ++i) {
        var item = itemIdsToShow[i];
        outItems.push(item);
        if (item.command_id != -1 && i != itemIdsToShow.length - 1 && itemIdsToShow[i + 1].command_id != -1) {
          outItems.push({command_id: -1});  // Separator.
        }
      }

      //e.request.allow(itemIdsToShow);
      e.request.allow(outItems);
      LOG('done calling allow()');
    //}, 3000);
    }, 30);
  });

  w.src = src;
  document.querySelector('#container').appendChild(w);
};
