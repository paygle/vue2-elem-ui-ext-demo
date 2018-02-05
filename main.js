/** Index 入口模块JS处理 */
define([
  'vue',
  'ELEMENT',
  "axios",
  "promise",
  'components/login/main'
], function(Vue, ELEMENT, axios, Promise) {
  'use strict';
  window.Vue = Vue;           // 作为全局使用
  window.ELEMENT = ELEMENT;   // 作为全局使用
  window.Promise = Promise;     // 这个必须想入否则无法在IE浏览器里面使用 vuex
  Vue.prototype.$axios = axios; //在其他vue组件中就可以this.$axios调用使用
  Vue.use(ELEMENT);  // 使用框架组件

  // http request 请求拦截器，附加公共header参数
  axios.interceptors.request.use(
  config => {
    config.headers.biz_appKey = "user";
    config.headers.biz_appSecret = "password";
    config.headers.rpc_group = "cs";
    config.headers.rpc_version = "1.0";
    return config;
  },
  err => {
    return Promise.reject(err);
  });

  new Vue({
    el:'#main-body'
  });
 
});