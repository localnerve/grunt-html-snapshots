/**
 * Create a local web server for tests
 */
const http = require("http"),
      url  = require("url"),
      path = require("path"),
      fs   = require("fs");

module.exports = {

  start: function(rootDir, port, end) {
    http.createServer(function(request, response) {

      const uri = url.parse(request.url).pathname;
      let filename = path.join(rootDir, uri);

      fs.exists(filename, function(exists) {
        if(!exists) {
          response.writeHead(404, {"Content-Type": "text/plain"});
          response.write("404 Not Found\n");
          response.end();
          return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function(err, file) {
          if(err) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(err + "\n");
            response.end();
            if (typeof end === "function")
              setTimeout(end, 1000);
            return;
          }

          if (path.extname(filename) === '.xml') {
            response.writeHead(200, {"Content-Type": "text/xml"});
            response.write(file);
          } else {
            response.writeHead(200);
            response.write(file, "binary");
          }
          response.end();
          if (typeof end === "function")
            setTimeout(end, 1000);
        });
      });
    }).listen(parseInt(port, 10));
  }
};