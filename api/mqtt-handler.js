'use strict'
const config = require('./config');
const database = require('./database');

class MqttHandler {

   constructor() {}

   process (topic, message) {
      console.log("--------------------------------------------------------------------------------");
      console.log('topic   - '+topic);
      console.log('message - '+message);
      if (topic == config.queueorders) {
         const obj = JSON.parse(message);
         if (obj.locker.id == config.lockerId) {
            delete obj._id;
            database.insert(obj, function(err, doc) {
               if(err) {
                  console.log('Error: ' + err);
               } else {
                  console.log('Adicionado com sucesso: ' + doc._id);
               }
            });  
         }
      }
   }


}

module.exports = MqttHandler;