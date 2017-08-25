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
  data(){
    return {
    
    }
  },
  computed:{
    data1(){
      if(this.tmplData){
        return this.tmplData.cop
      }
      return ""
    },
    data2(){
      if(this.tmplData){
        return this.tmplData.dat
      }
      return ""
    }
  },
  mounted(){
    console.log("Templ Data", this.tmplData)
  },
  methods: {

  }
});

});
