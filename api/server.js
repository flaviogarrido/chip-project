'use strict'
const http = require('http');
const url = require('url');
const mqtt = require('mqtt');
const config = require('./config')
const staticalserver = require('./statical-server');
const apihandler = require('./api-handler');
const mqtthandler = require('./mqtt-handler');

const port = process.argv[2] || 3000;
const hostname = '127.0.0.1';

//http server
const server = http.createServer((req, res) => {
  if (req.url.startsWith('/v1/')) {
    var api = new apihandler();
    api.process(req, res);
  } else {
    var web = new staticalserver();
    web.process(req, res);
  }
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//mqtt
const client = mqtt.connect(
  'mqtt://m13.cloudmqtt.com:14577', {
    "username":"prxrswjm", 
    "password":"oXR8VkF2Qreh"
  })
  .on('connect', function () {
    client.subscribe(config.lockerId);
    client.subscribe(config.queueorders);
    client.publish(config.lockerId, JSON.stringify({
      "lockerId": config.lockerId,
      "process": "api-server",
      "datetime": new Date(),
      "command": "on"
    }));
  }).on('message', function (topic, message) {
    var handler = new mqtthandler();
    handler.process(topic, message);
  });

//heartbeat
setInterval(() => {
  client.publish(config.lockerId, JSON.stringify({
    "lockerId": config.lockerId,
    "process": "api-server",
    "datetime": new Date(),
    "command": "heartbeat"
  }), function(err) {
    if(err) {
      console.log('heartbeat-publish-error: ' + err);
    }
  })
}, 
60000); // 1 min