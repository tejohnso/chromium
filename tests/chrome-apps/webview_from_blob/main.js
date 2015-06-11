(function() {
  window.onload = function() {
    var wv = document.createElement("webview");

    wv.addEventListener("consolemessage", function(e) {
      console.log("Webview console: " + e.message);
    });

    retrieveLocalFileBlob()
    .then(saveToFilesystem)
    .then(retrieveFilesystemBlob)
    .then(function(resp) {
      var url = URL.createObjectURL(resp);
      console.log("url is " + url + " size " + resp.size);
      wv.src = url;
      document.body.appendChild(wv);
    });
  };

  function errH(e) {console.log("Error handler: " + e.message);}

  function retrieveLocalFileBlob() {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";

      xhr.open("GET", "test.html");
      xhr.onload = function() {
        resolve(xhr.response);
      };

      xhr.send();
    });
  }

  function saveToFilesystem(blob) {
    return new Promise(function(resolve, reject) {
      var fs = webkitRequestFileSystem(PERSISTENT, 90000000000, function(fs) {
        fs.root.getFile("testfs.html", {create: true}, function(fe) {
          fe.createWriter(function(fw) {
            fw.onwriteend = function() {
              resolve();
            };

            fw.onerror = function(err) {
              reject(err);
            };

            fw.write(blob);
          }, errH);
        }, errH);
      }, errH);
    });
  }

  function retrieveFilesystemBlob() {
    return new Promise(function(resolve, reject) {
      var fs = webkitRequestFileSystem(PERSISTENT, 90000000000, function(fs) {
        fs.root.getFile("testfs.html", {}, function(fe) {
          fe.file(function(file) {
            var reader = new FileReader();
            resolve(file);
          });
        }, errH);
      }, errH);
    });
  }
}());
