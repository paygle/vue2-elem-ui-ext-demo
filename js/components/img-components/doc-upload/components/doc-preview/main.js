/** doc-preview component */
define([
  "vue",
  "utilExt",
  "lodash",
  'mixins/emitter',
  'text!uploader/doc-upload/components/doc-preview/main.tpl',
  'uploader/constants/img-constants',
  'uploader/doc-upload/components/fullview/fullview'
], function(
  Vue,
  util,
  lodash,
  emitter,
  tpl,
  CONSTS,
  fullView
){
  'use strict';
var merge = lodash.merge;
var CONSTANTS = CONSTS.CONSTANTS;
var EDITORPATH = location.origin + (
  /^\/\w+\.html/.test(location.pathname) ? '' :
  location.pathname.substring(0, location.pathname.indexOf('/', 1))
) + '/static/editor/';

function isImage(name) {
  var type = name.substring(name.lastIndexOf('.') + 1).toLowerCase();
  if (type == 'jpg')
      return true;
  else if (type == 'jpeg')
      return true;
  else if (type == 'png')
      return true;
  else if (type == 'gif')
      return true;
  else if (type == 'bmp')
      return true;
  else return false;
}

return Vue.component('doc-preview', {
  template: tpl,
  cName:'影像预览',
  componentsName: 'DocPreview',
  mixins: [emitter] ,
  props:{
    uploadServer : String ,
    server: String,
    notece: Object,
  },
  data: function() {
    return {
       //nothumb: nothumb ,
      app_path: APP_CONFIG.APP_PATH,
			rows:[],
			orderType:"",
			c_prt_id : "",
			c_pk_ids : []
    };
  },
  computed:{
    original: function(){
      return this.server + "/original/";
    },
    thumb: function(){
      return this.server + "/thumb/";
    },
    edit: function(){
      return this.uploadServer ;
    },
    E_YES_OR_NO: function(){
      return CONSTANTS.E_YES_OR_NO ;
    }
  },
  methods: {
    checked: function(idx, event) {
      var selected = this.rows[idx].selected === CONSTANTS.E_YES_OR_NO.YES.c_code 
                      ? CONSTANTS.E_YES_OR_NO.NO.c_code : CONSTANTS.E_YES_OR_NO.YES.c_code;
      this.$set(this.rows[idx], "selected", selected) ;

      var len = this.rows.filter(function(item){
          return item.selected === CONSTANTS.E_YES_OR_NO.YES.c_code;
      }).length
      this.$emit('checkLen',len);
    },
    editImage: function(idx, event) { //打开编辑图片页面
      var el = this.rows[idx >> 0];
      if (!el.c_is_image) {
          ELEMENT.Message.warning(el.c_name + "不是图片，无法编辑");
          return;
      }
      var url = this.original + (el.c_new_image_id  || el.c_image_id) ;
      var link = this.createEditUrl(url, el.c_image_id) ;
      window.open(link);
    },
    remark: function(idx, event) {
      this.rows[idx].showRemark = true ;
      this.rows[idx].showName = false ;
      setTimeout(function(){$(event.target).parents('.file-item').find('.file-name input[name="c_remark"]').focus();},50);
    },
    rename: function(idx, event) {
      this.rows[idx].showName = true ;
      this.rows[idx].showRemark = false ;
      setTimeout(function(){$(event.target).parents('.file-item').find('.file-name input[name="c_name"]').focus();},50);
    },
    resetView: function(idx,event) {
      this.rows[idx].showName = false ;
      this.rows[idx].showRemark = false ;
      this.submitData(idx);
    },
    deleteFromBtn : function(idx){
      ELEMENT.MessageBox.confirm("是否删除选中的影像",'提示').then(function(){
        this.deleteImage(idx) ;
      });
    },
    deleteImage: function(idx, c_image_id) {
      var self = this;
      var c_image_ids = [];
      if (idx !== undefined && idx >= 0) {
          c_image_ids.push(self.rows[idx].c_image_id);
      }
      if (c_image_id !== undefined && idx != '') {
          c_image_ids.push(c_image_id);
      }
      util.request({
        serviceId: '25000023',
        tranCode: 'IMG0000023',
        model: {
            c_busi_no : self.notece.c_busi_no,
            c_image_id: c_image_ids
        },
        loadingMessage: '正在删除，请稍候',
        onSuccess: function(jqXHR, textStatus, data) {
            if (CONSTANTS.E_YES_OR_NO.YES.c_code === data.model.status) {
                self.removeImages(c_image_ids);
            }
        },
        onError: function(jqXHR, textStatus, data) {
            ELEMENT.Message.error(data.message);
        }
      });
    },
    submitData: function(idx) { //提交更改的内容
      var image = this.rows[idx];
      util.request({
        serviceId: '25000025',
        tranCode: 'IMG0000025',
        model: {
            c_busi_no : image.c_busi_no,
            c_image_id: image.c_image_id,
            c_name: image.c_name,
            c_remark: image.c_remark
        },
        onSuccess: function(jqXHR, textStatus, data) {
            //不提交任务信息，不做任务操作
        },
        onError: function(jqXHR, textStatus, data) {
            ELEMENT.Message.error(data.message);
        },
      });
    },
    setNotece: function(n){
      this.notece = n ;
      this.reload();
    },
    reload: function(order){
      var self = this ;
      self.orderType = order || self.orderType ;
      var include = self.notece.level*1 <= 1 ? CONSTANTS.E_YES_OR_NO.YES.c_code : CONSTANTS.E_YES_OR_NO.NO.c_code;
      util.request({
        serviceId	:'25000026',
        tranCode	:'IMG0000026',
        loadingMessage:'正在加载影像',
        model:{
          c_busi_no : self.notece.c_busi_no ,
          c_path : self.notece.c_path,
          include : include,
          orderType	: self.orderType ,
        },
        onSuccess: function(jqXHR, textStatus, data){
          for(var i=0;i<data.model.list.length;i++){
              data.model.list[i].c_is_image = isImage(data.model.list[i].c_name) ;
              data.model.list[i].showName = false ;
              data.model.list[i].showRemark = false ;
          }
          self.rows = data.model.list;
          //激活点击查看大图插件
          self.refresh();
        },
        onError	: function(jqXHR, textStatus, data){
            ELEMENT.Message.error(data.message);
            self.rows = [];
        },
          
      });
    },
    //预留刷新接口，现无实现
    refresh: function(){
 
    },
    setImages: function(images){
      //this.insertRows(images,false) ;   使用此方法会清空原有的行记录
      if($.isArray(images)){
        for(var i=0; i< images.length;i++){
          images[i].c_is_image = isImage(images[i].c_name);
          images[i].showName = false ;
          images[i].showRemark = false ;
          this.rows.push(images[i]);
        }
      }else{
        images.c_is_image = isImage(images.c_name);
        images.showName = false ;
        images.showRemark = false ;
        this.rows.push(images);
      }
      this.refresh();
    },
    getCheckedImages: function(){
      var imgs = this.rows.filter(function(item,index){
        if(item.selected === CONSTANTS.E_YES_OR_NO.YES.c_code )
            return true ;
        else return false ;
      });
      return imgs;
    },
    //images 可以是一组影像id的数组，也可以是单个的c_image_id
    removeImages: function(images) {
      if($.isArray(images)){
        var idxs = []; //记录目标影像在this.rows的下标
        for(var i=0;i<images.length;i++){
          for(var j=0;j<this.rows.length; j++){
            if(images[i] == this.rows[j].c_image_id){
              idxs.push(j);
              break;
            }
          }
        }
        //删除this.rows匹配的行
        for(var k = idxs.length-1; k>=0;k--){
            this.rows.splice(idxs[k],1);
        }
      }else{
        for(var g=0;g<this.rows.length; g++){
          if(images == this.rows[g].c_image_id){
            this.rows.splice(g,1);
            break;
          }
        }
      }
    },
    //在当前rows里查找匹配的影像ID，优先匹配c_new_image_id 
    findOriginalImage: function(imageId){
      if(imageId) {
        for(var i=0; i< this.rows.length ; i++){
          if(imageId === this.rows[i].c_new_image_id || imageId === this.rows[i].c_image_id){
              return JSON.stringify(this.rows[i]);
          }
        }
      }
      return JSON.stringify({});
    },
    createEditUrl: function(url,c_image_id){
        return EDITORPATH + 'index.html?image='+url+'&serv='+this.edit+'&router='+
        APP_CONFIG.API_URL+'core/router&imageId='+c_image_id;
    },
    openFullview: function(el){
      var self = this ;
      var instance = fullView({
        visible : true ,
        rows : self.rows.filter(function(item){ return isImage(item.c_name); }),
        server : self.server ,
        currentEl : el ,
        onEdit : function(el){
            var url = self.original + el.src ;
            var link = self.createEditUrl(url, el.c_image_id) ;
            window.open(link);
        },
        onDelete : function(el){
            var c_image_id = el.c_image_id ;
            self.deleteImage(-1, c_image_id);
        }
      });
    }
  },
  watch:{
    notece: function(val, old){
      if(val.c_pk_id !== old.c_pk_id){
        this.setNotece(val);
      }else{
        this.reload();
      }
    }
  },
  beforeDestroy: function() {
    $('.open-view .file-icon').off('dblclick').remove();
    $('.LookPicture_Background').remove();
    $('.LookPicture').remove();
  }
});

}); //End doc-preview
