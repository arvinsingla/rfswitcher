#!/usr/bin/env node

var application_root = __dirname,
    executable = 'codesend',
    express = require('express'),
    async = require('async'),
    exec = require('child_process').exec,
    devices = require('./devices.json');

var app = express();

var findIndex = function(arr, key, value) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][key] === parseInt(value)) {
      return i;
    }
  }
  return null;
}

var switchQueue = async.queue(function(req, callback) {
  var onIndex = findIndex(devices, 'on', req);
  var offIndex = findIndex(devices, 'off', req);
  exec('./' + executable + ' ' + req.params.id, callback);
  if (onIndex) {
    devices[onIndex].status = 1;
  }
  if (offIndex) {
    devices[offIndex].status = 0;
  }
}, 1);

app.get('/api', function (req, res) {
  res.send('API available');
});

app.get('/api/status', function (req, res) {
  res.send('RF Switch Status API available.');
});

// RF Switch API Endpoint.
app.get('/api/status/:id', function (req, res){
  var index = findIndex(devices, 'id', req.params.id);
  if (index !== null) {
    res.send(devices[index]['status'] + '');
  }
  else {
    res.send(null);
  }
});

app.get('/api/switch', function (req, res) {
  res.send('RF Switch API available.');
});

// RF Switch API Endpoint.
app.get('/api/switch/:id', function (req, res){

  console.log("Request: " + req.originalUrl);

  switchQueue.push(req, function (error, stdout, stderr) {
      if (error !== null) {
        return res.status(500, {error: 'something blew up'}).send('FAILED');
      }
      return res.status(200).send('SUCCESS');
  });

});

// Launch server.
app.listen(80);
