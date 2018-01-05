/** El-Form-Exam */
define([
  'vue',
  'text!demo/exam-form/gridlayer-view/index.tpl',
  'text!demo/exam-form/gridlayer-view/data.json'
], function(Vue, tpl, data) {
  'use strict';

console.log('Uploader: gridlayer-view');

return Vue.component("gridlayerView", {

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
    favorClick: function(item){
      console.log('favor-click:', item.favorite)
      item.favorite = item.favorite == '1' ? '0' : '1';
      console.log('favor-clicked:', item.favorite)
    },
    CellClick: function(val){
      console.log('cell-click:', val);
    },
    urltmplFun: function(code, pcode){
      return "javascript:void(0);";
    }
  }
});

});