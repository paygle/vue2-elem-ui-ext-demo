/** doc-upload-dialog component */
define([
  "vue",
  "utilExt",
  "lodash",
  "webuploader",
  'mixins/emitter',
  'text!uploader/doc-upload/components/doc-upload-dialog/main.tpl',
  'uploader/constants/img-constants',
  "uploader/doc-upload/components/uploader/main"
], function(
  Vue,
  util,
  lodash,
  Webuploader,
  emitter,
  tpl,
  CONSTS
){
  'use strict';

var merge = lodash.merge;
var CONSTANTS = CONSTS.CONSTANTS;
window.WebUploader = Webuploader;

return Vue.component('doc-upload-dialog', {
  template: tpl,
  cName : '单证上传弹出框',
  componentName: 'DocUploadDialog',
  mixins: [emitter],
  props:{
    modal: {           // 是否模态
      type: Boolean,
      default: true
    },
    notece: Object ,
    server : {
      type : String ,
      default : APP_CONFIG.API_URL+'core/file'
    },
    fileSizeMax : [String, Number] , //文件最大大小
    fileType : String  //允许上传的文件类型
  },
  data: function() {
    return {
      imagesDialog: false ,
			uploader : {},
      paramAttchRule : {}
    };
  },
  computed:{
    params:function(){
      return {
        operate : 'upload',
        fileSizeMax : this.fileSizeMax || '',
        fileType : this.fileType || ''
      };
    },
    uploaderOption: function(){
      return {
        formData: this.params,
        server: this.server
      };
    }
  },
  methods: {
    open: function() {
      var self = this ;
      self.imagesDialog = true;
    },
    uploadFinished: function(obj) {
      var self = this ;
      if (obj.errors.length > 0)
          return;
      var files = obj.files;
      var node = merge({}, self.notece);
      delete node.children;
      util.request({
        serviceId: '25000024',
        tranCode: 'IMG0000024',
        model: {
          docDtl: node,
          info : files,
          c_up_code: util.getCurrentUser().current_dept_code,
          c_dept_code: util.getCurrentUser().c_oper_code
        },
        onSuccess: function(jqXHR, textStatus, data) {
          ELEMENT.Message.success(data.model.message + ",2秒后关闭上传弹出框...");
          self.$emit('images', files);
          setTimeout(function() {
              self.imagesDialog = false;
          }, 2000);
        },
        onError: function(jqXHR, textStatus, data) {
          ELEMENT.Message.error(data.message);
        }
      });
    }
  }
});

}); //End doc-upload-dialog
