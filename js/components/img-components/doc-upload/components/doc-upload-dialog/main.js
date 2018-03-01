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
    fileType : String,  //允许上传的文件类型
    chunked : {
      type : Boolean,
      default : false , //是否启用分片断点续传，默认为否
    }
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
        fileSizeMax : this.fileSizeMax || '100M',
        fileType : this.fileType || ''
      };
    },
    uploaderOption: function(){
      return {
        formData: this.params,
        server: this.server,
        chunked : this.chunked , //启用分片
        chunkSize : 5242880 , //分片大小 5M
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
    },
    handleMd5(md5,promise){
        util.request({
            serviceId : "25000030",
            tranCode : "IMG0000030",
            model:{
                c_busi_no : this.notece.c_busi_no,
                c_path : this.notece.c_path,
                c_md5 : md5
            },
            onSuccess:(jqXHR, textStatus, data)=>{
                let info = data.model.info ;
                if(!info.c_md5){ //第一次上传
                    info.c_md5 = md5 ;
                    info.c_position = undefined;
                }else{
                    info.c_position = info.c_position.split("");
                }
                promise.resolve(info);
            },
            onError:(jqXHR, textStatus, data)=>{
                promise.reject();
            }
        });
    },
    handleOffsetChange(file){
        util.request({
            serviceId : "25000031",
            tranCode : "IMG0000031" ,
            model:{
                c_busi_no : this.notece.c_busi_no,
                c_path : this.notece.c_path,
                c_md5 : file.md5 ,
                c_position : file._info.c_position.join("") ,
                c_image_id : file._info.c_image_id,
                c_doc_code : this.notece.c_doc_code
            },
            onSuccess:(jqXHR, textStatus, data)=>{
            },
            onError:(jqXHR, textStatus, data)=>{}
        });
    },
    loadJScript() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "static/js/uploader/webuploader.js" ;
        document.body.appendChild(script);
    }
  },
  mounted(){
     this.loadJScript();
  }
});

}); //End doc-upload-dialog
