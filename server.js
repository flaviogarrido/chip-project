const app = require('express')()

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://m13.cloudmqtt.com:14577',{"username":"prxrswjm", "password":"oXR8VkF2Qreh"})

app.listen(3000,function(){
  console.log("porta 3000...")
})


client.on('connect', function () {
  // client.subscribe('presence')
  client.subscribe('ordersToLocker')
  // client.publish('presence', 'Hello mqtt')
  client.publish('ordersToLocker', '1')

  //client.publish('ordersToLocker', JSON.stringify({order:"120371203721"}))
})

client.on('message', function (topic, message) {
  console.log('topic - '+topic)
  // message is Buffer
  console.log(message.toString())
  // client.end()
})