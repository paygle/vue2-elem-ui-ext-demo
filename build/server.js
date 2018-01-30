var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();
var opn = require('opn');
var cfg = require('./config.js');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');

app.use('/api', proxy({
  target: 'http://192.168.18.33:8090/',//设置你调用的接口域名和端口号 别忘了加http
  changeOrigin: true ,
  pathRewrite: {
    //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替
    // 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
    '^/api': ''
  },
  onProxyReq(proxyReq, req, res) {
    //防止代理将headers字段变成小写
    proxyReq.setHeader('biz_apiId', req.headers['biz_apiid']);
    proxyReq.setHeader('biz_appKey', req.headers['biz_appkey']);
    proxyReq.setHeader('biz_appSecret', req.headers['biz_appsecret']);
    proxyReq.setHeader('rpc_group', req.headers['rpc_group']);
    proxyReq.setHeader('rpc_version', req.headers['rpc_version']);
  }
}));

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
