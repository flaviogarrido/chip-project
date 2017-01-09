'use strict'
//const interaction = require('./interaction');
const exec = require('child_process').exec;
const database = require('./database');

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
         var order = levels[3];
         var passw = levels[4];
 
         // var result = interaction.process(order, passw);
         // console.log('Result is ' + JSON.stringify(result));
         // //TODO: handle api request

         var result = {
            code: 0,
            message: 'Success'
         };
         //localizar o registro
         database.findOne({_id: order }, function(err, doc) {
            if (err) {
               result.code = 1;
               result.message = err;
            } else if (!doc) {
               result.code = 2;
               result.message = 'Invalid order';
            } else if (doc.pwdToUnlock != passw) {
               result.code = 3;
               result.message = 'Invalid password';
            }
            //abrir a porta do locker
            if (result.code == 0) {
               var child = exec('./open.sh 0', function(error, stdout, stderr) {
                  console.log('stdout: ' + stdout);
                  console.log('stderr: ' + stderr);
                  if (error != null) {
                     console.log('exec error: ' + error);
                  }
               });
            }

            //notificar via mqtt o server
            //retornar
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(result));
         });
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