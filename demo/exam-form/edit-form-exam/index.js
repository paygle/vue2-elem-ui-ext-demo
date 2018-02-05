/** QueryForm component */
define([
  'vue',
  'text!demo/exam-form/edit-form-exam/index.tpl',
  'funcs',
  'demo/exam-form/edit-form-exam/add-row/main',
  'demo/exam-form/edit-form-exam/edit-row/main',
  'demo/exam-form/edit-form-exam/query-form/main',
], function(
  Vue,
  tpl,
  funcs,
  AddRow,
  EditRow,
  QueryForm
){
  'use strict';

  return Vue.component('EditFormExam', {
    template: tpl,
    data: function(){
      return{
        activeName: 'QueryForm'
      }
    },
    methods: {
      getParams: function() {
        console.log("wrapRoute:", this.wrapRoute);
        return {x:'xxx'}
      }
    },
    mounted: function() {
      // setTimeout(_=>{
      //   this.activeName = 'AddRow';
      // }, 3000);
    }
  });

});
