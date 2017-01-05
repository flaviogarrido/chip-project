const app = require('express')()

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://m13.cloudmqtt.com:14577',{"username":"prxrswjm", "password":"oXR8VkF2Qreh"})

app.listen(3000,function(){
  console.log("porta 3000...")
})


client.on('connect', function () {
  client.subscribe('presence')
  client.publish('presence', 'Hello mqtt')
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})