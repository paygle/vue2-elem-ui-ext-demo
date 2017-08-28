/** El-Form-Exam */
define([
  'vue',
  'text!demo/exam-form/waterfall-view/index.tpl',
  'text!demo/exam-form/waterfall-view/data.json'
], function(Vue, tpl, data) {
  'use strict';
 
return Vue.component("WaterfallView", {

  template: tpl,
 
  data(){

    return {
      fieldsName: {

      },
      listdata: JSON.parse(data)
    }
  },

  methods: {
    CellClick(val){
      console.log('cell-click:', val)
    },
    urltmplFun(code, pcode){
      return "javascript:void(0);"
    }
  }
});

});