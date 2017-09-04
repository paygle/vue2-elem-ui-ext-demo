/** Templ component */
define([
  'vue',
  'text!demo/exam-form/case-tracking/templ/main.tpl'
], function(Vue, tpl) {
  'use strict';

  console.log('Templ load!');
 
return Vue.component('Templ', {
  template: tpl,
  componentName: 'Templ',
  props: {
    tmplData: [Object, Array]    // 查询返回数据
  },
  data: function(){
    return {
    
    }
  },
  computed:{
    data1: function(){
      if(this.tmplData){
        return this.tmplData.cop
      }
      return ""
    },
    data2: function(){
      if(this.tmplData){
        return this.tmplData.dat
      }
      return ""
    }
  },
  mounted: function(){
    console.log("Templ Data", this.tmplData)
  },
  methods: {

  }
});

});
