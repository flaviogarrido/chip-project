const database = require('./database');

var obj = {}

obj.process = function(order, password) {
   var result = {
      code: 0,
      message: 'Success'
   };
   //localizar o registro
   database.findOne({_id: order }, function(err, doc) {
      if (err) {
         result.code = 1;
         result.message = err;
         console.log(0);
         return result;
         console.log(1);
      }
      if (!doc) {
         result.code = 2;
         result.message = 'Invalid order';
         console.log(2);
         return result;
         console.log(3);
      }
      if (doc.pwdToUnlock != password) {
         result.code = 3;
         result.message = 'Invalid password';
         console.log(4);
         return result;
         console.log(5);
      }
      //abrir a porta do locker
      //notificar via mqtt o server
      console.log(6);
      return result;
      console.log(7);
    });
}

module.exports = obj;