'use strict'
const http = require('http');
const url = require('url');
const mqtt = require('mqtt');
const config = require('./config')
const staticalserver = require('./statical-server');
const apihandler = require('./api-handler');
const mqtthandler = require('./mqtt-handler');

if (process.argv[2]) {
  if (process.argv[2] == '-h') {
    console.log('locker - help');
    console.log('modo de uso:');
    console.log('  node server [hostname/ip] [port]');
    return;
  }
  if (process.argv[2] == '-config') {
    console.log('locker.id.............: ' + config.locker.id);
    console.log('locker.name...........: ' + config.locker.name);
    console.log('web.hostname..........: ' + config.web.hostname);
    console.log('web.port..............: ' + config.web.port);
    console.log('api.version...........: ' + config.api.version);
    console.log('mqtt.server...........: ' + config.mqtt.server);
    console.log('mqtt.port.............: ' + config.mqtt.port);
    console.log('mqtt.username.........: ' + config.mqtt.username);
    console.log('mqtt.password.........: ' + config.mqtt.password);
    console.log('mqtt.queue.order......: ' + config.mqtt.queue.order);
    delete process.argv[2];
    delete process.argv[3];
  }
}

//http server
const hostname = process.argv[2] || config.web.hostname;
const port = process.argv[3] || config.web.port;
const server = http.createServer((req, res) => {
  if (req.url.startsWith('/'+config.api.version+'/')) {
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
  config.mqtt.server + ':' + config.mqtt.port, {
    "username": config.mqtt.username, 
    "password": config.mqtt.password
  })
  .on('connect', function () {
    console.log('Mqtt connected');
    client.subscribe(config.locker.id);
    client.subscribe(config.mqtt.queue.order);
    client.subscribe(config.mqtt.queue.server);
    client.publish(config.locker.id, JSON.stringify({
      "lockerId": config.locker.id,
      "process": "api-server",
      "datetime": new Date(),
      "command": "on"
    }));
  }).on('message', function (topic, message) {
    console.log('Mqtt message recivied');
    var handler = new mqtthandler();
    handler.process(topic, message);
  });

//heartbeat
setInterval(() => {
  console.log('Interval to publish heartbeat');
  client.publish(config.locker.id, JSON.stringify({
    "lockerId": config.locker.id,
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