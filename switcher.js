#!/usr/bin/env node

var application_root = __dirname,
    executable = "codesend",
    express = require("express"),
  //  bodyParser = require('body-parser'),
    exec = require('child_process').exec;

var app = express();

//app.use(bodyParser());

app.get('/api', function (req, res) {
  res.send('API available');
});

app.get('/api/switch', function (req, res) {
  res.send('RF Switch API available.');
});

// RF Switch API Endpoint.
app.get('/api/switch/:id', function (req, res){

  return exec('./' + executable + ' ' + req.params.id,
    function (error, stdout, stderr) {
      if (error !== null) {
        return res.status(500, {error: 'something blew up'}).send('FAILED');
      }
      return res.status(200).send('SUCCESS');
  });
});

// Launch server.
app.listen(4242);
