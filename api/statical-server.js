'use strict'

const fs = require('fs');
const path = require('path');

class StaticalServer {
   
   constructor() {}

   process (req, res) {
      const webpath = '../web';
      var filename = webpath + req.url;
      
      fs.exists(filename, function(exists) {
         if(!exists) {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.write("404 Not Found\n");
            res.end();
            return;
         }

         if (fs.statSync(filename).isDirectory()) {
            filename = path.join(filename, 'locker.html');
         }

         fs.readFile(filename, "binary", function(err, file) {
            if(err) {        
               res.writeHead(500, {"Content-Type": "text/plain"});
               res.write(err + "\n");
               res.end();
               return;
            }

            res.writeHead(200);
            res.write(file, "binary");
            res.end();
            console.log('server send %s', filename);
         });
      });
   }
}

module.exports = StaticalServer;