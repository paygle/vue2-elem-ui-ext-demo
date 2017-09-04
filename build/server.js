var express = require('express'),
    app = express(),
    opn = require('opn'),
    argv = require('minimist')(process.argv.slice(2)),
    path = require('path');

if(argv['test']) {
  app.use('/',express.static(path.join(__dirname, '../dist')));
}else {
  app.use(express.static(path.join(__dirname, '../')));
}
 
var server = app.listen(3123, function(){
  var port = server.address().port;
  console.log('server listening at http://localhost:%s', port);
  opn('http://localhost:'+port);
});
