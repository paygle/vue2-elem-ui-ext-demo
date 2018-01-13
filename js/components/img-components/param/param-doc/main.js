/** param-doc component */
define([
  'vue',
  "funcs",
  "utilExt",
  'mixins/emitter',
  'text!uploader/param/param-doc/main.tpl',
  "uploader/constants/img-comm"
], function(Vue, funcs, util, emitter, tpl, imgComm){
  'use strict';

var merge = funcs.merge;
var EMPTY_FILTER = {
    "c_doc_code": "", //单证代码
    "c_doc_name": "", //单证名称
}; 
var EMPTY = {
    "c_pk_id": "", //主键
    "c_doc_code": "", //单证代码
    "c_doc_name": "", //单证名称
    "c_remark": "", //备注
};

return Vue.component('param-doc', {
  template: tpl,
  cName : '单证规则',
  componentName: 'DocRules',
  mixins: [emitter,imgComm],
  props:{
    args:[Array, Object],     // mesh-tabs 组件传入参数
  },
  data: function() {
    return {
      c_kind_no : "" , //险类代码
      filter: merge({}, EMPTY_FILTER),
      rows:[],
      newRow: merge({}, EMPTY),
      pageNo: 1,
      pageSize: 10,
      total: 0,
      selectRowIndex: -1 ,
      selection: [],
      rules:{
          'c_doc_code':[{required:true, message:'单证代码不能为空',trigger: 'blur'}],
          'c_doc_name':[{required:true, message:'单证名称不能为空',trigger: 'blur'}],
      },
      submitLoading : false  //单证配置提交按钮 loading 控制标识
    };
  },
  watch:{
    "c_kind_no" : function(value, old ){
      if(value !== old){
          this.query(true);
      }
    }
  },
  methods:{
    retFalse: function(){ return false; },
    changeSize: function(val){
      this.pageSize = val;
      this.query();
    },
    query: function(btn) {
      if($.type(btn) === 'boolean'){
          this.pageNo = 1 ;
      }else if($.type(btn) === 'number'){
          this.pageNo = btn ;
      }
      this.selectRowIndex = -1 ;
      var self = this;
      util.request({
          model : merge({
              c_sys_code : self.args.c_sys_code,
              c_kind_no : self.c_kind_no 
          }, self.filter),
          serviceId : "25000003",
          tranCode :  "IMG0000003",
          pageNo : self.pageNo,
          pageSize : self.pageSize,
          onSuccess : function(jqXHR, textStatus, data) {
              self.total = data.total;
              for(var i=0; i<data.model.list.length;i++ ){
                  data.model.list[i].$status = util.consts.STATUS_NORMAL;
              }
              self.rows = data.model.list;
          },
          onError : function(jqXHR, textStatus, data) {
              self.rows = [];
          }
      });
    },
    reset: function() {
        this.filter = merge({},EMPTY_FILTER) ;
    },
    handleCurrentChange:function(row, event, column){
        this.selectRowIndex = $.inArray(row,this.rows) ;
    },
    handleTbSelectionChange:function(selection){
        this.selection = selection ;
    },
    handleTbChange: function(row, colName, rowIndex, val, data){
        row.$status = util.consts.STATUS_UPDATE ;
    },
    addDocClassify: function(){
        this.rows.push(merge({}, EMPTY, { $status: util.consts.STATUS_INSERT}));
    },
    saveParamDoc: function() {
      var self = this ;
      var _rows = self.rows.filter(function(item){
          if(item.$status === util.consts.STATUS_INSERT ){
              return true ;
          }else if(item.$status === util.consts.STATUS_UPDATE ){
              return true ;
          }else return false ;
      });
      if(_rows.length < 1 ) {
          return  ;
      }
      this.$refs.formTb.validate(function(valid){
        if(valid){
          self.submitLoading = true ;
          util.request({
              serviceId: "25000004",
              tranCode: "IMG0000004",
              model: {
                c_sys_code : self.args.c_sys_code,
                c_kind_no : self.c_kind_no ,
                list : _rows
              },
              onSuccess: function(jqXHR, textStatus, data) {
                self.submitLoading = false ;
                ELEMENT.Message.success(data.model.message);
                self.query(true);
              },
              onError: function(jqXHR, textStatus, data) {
                ELEMENT.Message.error(data.message);
                self.submitLoading = false ;
              }
          });
        }
      });
    },
    deleteDoc: function(rows){
      var _rows = rows.filter(function(item){
          if(item.$status === util.consts.STATUS_NORMAL ){
              return true ;
          }else if(item.$status === util.consts.STATUS_UPDATE ){
              return true ;
          }else return false ;
      });
      if(_rows.length<=0){
          return ;
      }
      var self = this ;
      util.request({
        serviceId:'25000005',
        tranCode : "IMG0000005",
        model : {
          list : util.getOriginalData(_rows)
        },
        onSuccess : function (jqXHR, textStatus, data) {
          ELEMENT.Message.success(data.model.message);
          self.query();
        },
        onError : function (jqXHR, textStatus, data) {
          ELEMENT.Message.error("删除失败");
        }
      });
    },
    deleteParamDoc: function(){
      if(this.selection.length>0){
        var self = this ;
        ELEMENT.MessageBox.confirm('此操作总计删除'+this.selection.length+'条数据, 是否继续?','提示').then(function(){
          self.deleteDoc(self.selection) ;
        }).catch(function(){
          ELEMENT.Message.info('删除取消');
        });
      }else{
        ELEMENT.Message.info('请选中要删除的数据');
      }
    }
  },
  mounted: function(){
    this.query(true);
  }
});

}); //End param-doc
