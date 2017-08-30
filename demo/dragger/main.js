/** 拖拽 */
define([
  'jquery',
  'vue',
  'ELEMENT',
  'demo/dragger/dragger'
], function($, Vue, ELEMENT, Dragger) {
  'use strict';
  Vue.use(ELEMENT); //使用框架组件
  new Vue({
    el: '#main-body'
  });

  var dragger = new Dragger('.color-green');
 
});