'use strict'

class ApiHandler {

   constructor() {}

   process(req, res) {
      console.log('request url = %s', req.url);
      const resource = req.url;
      const levels = req.url.split('/');
      if (levels.lenght<3) {
         bad_request(res);
         return;
      }
      if ((levels[1] == 'v1') && (levels[2] == 'code')) {
         res.writeHead(200, {"Content-Type": "application/json"});
         res.end(JSON.stringify({"codigo": levels[3]}));
         return;
      } else {
         bad_request(res);
         return;
      }
   }

   bad_request(res) {
      console.log("bad request");
      res.writeHead(400, {"Content-Type": "application/json"});
      res.end();
   }
   
}

module.exports = ApiHandler;