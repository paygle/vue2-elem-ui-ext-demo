/** home 入口模块JS处理 */
define([
  'vue',
  'ELEMENT'
], function(Vue, ELEMENT) {
  'use strict';
  Vue.use(ELEMENT); //使用框架组件

  new Vue({
    el:'#main-body'
  });
 
});