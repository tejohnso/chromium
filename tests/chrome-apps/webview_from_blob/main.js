(function() {
  window.onload = function() {
    var wv = document.createElement("webview");

    wv.addEventListener("consolemessage", function(e) {
      console.log("Webview console: " + e.message);
    });

    retrieveLocalFileBlob()
    .then(function(resp) {
      var url = URL.createObjectURL(resp);
      console.log("url is " + url + " size " + resp.size);
      wv.src = url;
      document.body.appendChild(wv);
    });
  };

  function errH(e) {"Error handler: " + console.log(e.message);}

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
}());
