'use strict'

const http = require('http');
const url = require('url');
const mqtt = require('mqtt');
const apihandler = require('./api-handler');
const staticalserver = require('./statical-server');

const port = process.argv[2] || 3000;
const hostname = '127.0.0.1';

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

const client = mqtt.connect(
  'mqtt://m13.cloudmqtt.com:14577', {
    "username":"prxrswjm", 
    "password":"oXR8VkF2Qreh"
  })
  .on('connect', function () {
    client.subscribe('ordersToLocker');
    client.publish('ordersToLocker', '1');
  }).on('message', function (topic, message) {
    console.log('topic - '+topic);
    console.log(message.toString());
  });