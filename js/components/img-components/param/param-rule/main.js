/** param-rule component */
define([
  'vue',
  "utilExt",
  'mixins/emitter',
  'text!uploader/param/param-rule/main.tpl',
  "uploader/constants/img-comm"
], function(Vue, util, emitter, tpl, imgComm){
'use strict';
console.log('imgComm 3---> ', imgComm);
return Vue.component('doc-rules', {
  template: tpl,
  mixins: [emitter,imgComm],
  data: function() {
    return {
      docRule: {
        "n_one_file_size": "0", //单文件大小上限
        "n_all_file_size": "0", //案件总大小上限
        "n_max_files": "0", //案件单证数量上限
        "c_up_file_type": "", //上传文件类型
        "c_kind_no" : "" ,  //险类标识
        "c_sys_code" : "" , //系统标识
      },
      submitLoading : false , //单证配置提交按钮 loading 控制标识
    };
  },

  methods:{
      docRuleSubmit: function() {
          var self = this ;
          self.submitLoading = true ;
          util.request({
              "model": {
                  rule : self.docRule 
              },
              "tranCode": "IMG0000002",
              "serviceId": "IMG00002",
              "onSuccess": function(jqXHR, textStatus, data) {
                  ELEMENT.Message.success(data.model.message);
                  self.submitLoading = false ;
              },
              "onError": function(jqXHR, textStatus, data) {
                  ELEMENT.Message.error(data.message) ;
                  self.submitLoading = false ;
              }
          });
      },
      docRuleInit: function(){
        var self = this ;
        util.request({
        "model" :{
                    c_sys_code : this.args.c_sys_code ,
                    c_kind_no : this.docRule.c_kind_no
                },
        "tranCode" :"IMG0000001",
        "serviceId" :"IMG00001",
        "onSuccess" : function(jqXHR, textStatus, data) {
            self.$set(self,"docRule", data.model.rule);
        },
        "onError" : function(jqXHR, textStatus, data) {
            ELEMENT.Message.error(data.message);
        }
      });
    },
  },
  watch:{
    "args" :{
      deep: true,
      handler: function(value, old) {
        if(value.c_sys_code !== old.c_sys_code ){
            this.docRuleInit();
        }
      }
    },
    "docRule.c_kind_no" : function(value , old ){
      if(value !== old ){
          this.docRuleInit() ;
      }
    }
  },
  mounted: function(){
    this.docRuleInit();
  }  
});

}); //End param-rule
