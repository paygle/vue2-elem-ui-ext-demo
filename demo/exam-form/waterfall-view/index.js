/** El-Form-Exam */
define([
  'vue',
  'text!demo/exam-form/waterfall-view/index.tpl',
  'text!demo/exam-form/waterfall-view/data.json'
], function(Vue, tpl, data) {
  'use strict';

console.log('Uploader: waterfall-view');

return Vue.component("WaterfallView", {

  template: tpl,

  data: function(){

    return {
      fileInfo: {
        c_co_busi_no: '1233122', //合并单号
        c_busi_no: '324343434', //业务单号
        c_sub_busi_no: '', //分单号
        c_sys_code: 'UPROP',  //系统标识
        c_kind_no: 'Addw'  //产品代码
      },
      file_server: APP_CONFIG.API_URL+'core/file',
      file_view_server: APP_CONFIG.IMG_URL,
      fieldsName: {},
      listdata: JSON.parse(data)
    };
  },

  methods: {
    CellClick: function(val){
      console.log('cell-click:', val)
    },
    urltmplFun: function(code, pcode){
      return "javascript:void(0);"
    }
  }
});

});