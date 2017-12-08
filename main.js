/** Index 入口模块JS处理 */
define([
  'vue',
  'ELEMENT',
  'components/login/main'
], function(Vue, ELEMENT) {
  'use strict';
  window.$ = window.jQuery = jQuery;
  window.Vue = Vue;           // 作为全局使用
  window.ELEMENT = ELEMENT;   // 作为全局使用
  Vue.use(ELEMENT);  // 使用框架组件

  new Vue({
    el:'#main-body'
  });
 
});