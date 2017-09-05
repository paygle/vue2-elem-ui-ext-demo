var express = require('express'),
    app = express(),
    opn = require('opn'),
    cfg = require('./config.js'),
    argv = require('minimist')(process.argv.slice(2)),
    path = require('path');

if(argv['test']) {
  app.use('/',express.static(path.join(__dirname, '../dist')));
}else {
  app.use(express.static(path.join(__dirname, '../')));
}
 
var server = app.listen(cfg.port, function(){
  var port = server.address().port;
  console.log(`server listening at ${cfg.host}:%s`, port);
  opn(`${cfg.host}:`+port);
});
