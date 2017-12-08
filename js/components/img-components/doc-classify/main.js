/** doc-classify component */
define([
  "vue",
  "utilExt",
  "lodash",
  'mixins/emitter',
  'text!uploader/doc-classify/main.tpl',
  'uploader/constants/img-constants',
  "uploader/constants/img-comm"
], function(
  Vue,
  util,
  lodash,
  emitter,
  tpl,
  CONSTS,
  imgComm
){
  'use strict';
var merge = lodash.merge;
var CONSTANTS = CONSTS.CONSTANTS;
console.log('imgComm1 ---> ', imgComm);
return Vue.component('doc-classify', {
  template: tpl,
  cName : '单证分类',
  componentName: 'DocClassify',
  mixins: [emitter,imgComm],
  props:{
    args:[Array, Object]     // mesh-tabs 组件传入参数
  },
  data: function() {
    return {
      c_kind_no : "" , //险类代码 
      c_rel_code: "" ,
      c_doc_name: "",
      docTreeLoading  :false ,
      relativeLoading: false , //关联按钮的loading
      rows:[],
      pageNo: 1,
      pageSize: 10,
      total: 0 ,
      selection: [] ,
      showDocs: false ,
      ztreeId: 'docClasTree'+new Date().getTime(),
      ztreeObj:{} , //单证树对象
      currentTreeNode: null //当前选中操作树节点
    };
  },
  methods:{
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
      var self = this;
      util.request({
          serviceId : "IMG00012",
          tranCode : "IMG0000012",
          model: {
              c_sys_code : self.args.c_sys_code,
              c_kind_no : self.c_kind_no ,
              c_rel_code : self.c_rel_code,
              c_doc_name: self.c_doc_name
          },
          pageNo : self.pageNo,
          pageSize : self.pageSize,
          onSuccess : function(jqXHR, textStatus, data) {
              self.total = data.total;
              self.rows = data.model.result;
              self.showDocs = true ;
          },
          onError : function(jqXHR, textStatus, data) {
              self.rows = [] ;
              ELEMENT.Message.error(data.message);
          }
      });
    },
    handleTbSelectionChange:function(selection){
      this.selection = selection ;
    },
    //加载单证数据并初始化树状选择器
    loadZtree: function() {
      var self = this ;
      self.docTreeLoading = true;
      util.request({
          serviceId : 'IMG00011',
          tranCode  : 'IMG0000011',
          model:{
              c_sys_code : self.args.c_sys_code,
              c_kind_no : self.c_kind_no
          },
          onSuccess : function(jqXHR, textStatus, data){
              var node = data.model.result ;
              //设置单证节点显示标签名称
              for(var i=0;i<node.length;i++){
                  if(i===0){
                      node[i].open = true;
                      node[i].collapse = false;
                      node[i].nocheck = true;
                      node[i].isParent = true;
                  }
                  node[i].c_title = node[i].c_cname ;
                  if(node[i].c_is_must!=''){
                      var must = node[i].c_is_must==CONSTANTS.E_YES_OR_NO.YES.c_code?"(必须)":"(非必须)";
                      node[i].c_title +=must ;
                  }
              }
              self.destroyZtreeObj();
              if(node && node.length>0){
                  self.ztreeObj = $.fn.zTree.init($("#"+self.ztreeId ), self.setting, node);
              }
              self.docTreeLoading = false ; 
          },
          onError :function(jqXHR, textStatus, data){
              ELEMENT.Message.error(data.message);
              self.docTreeLoading = false ; 
          }
      });
    },
    destroyZtreeObj: function(){ //销毁ztree对象
      $.fn.zTree.destroy(this.ztreeId);
      if(this.ztreeObj.setting)
          this.ztreeObj.setting.treeObj = null  ;
    },
    //关联单证
    relate: function() {
      var self = this ;
      var docRows = util.getOriginalData(self.selection) ;
      if (docRows.length != 0) {
        self.relativeLoading = true ; //将按钮置为Loading状态
        util.request({
            serviceId: 'IMG00013',
            tranCode: 'IMG0000013',
            model: {
                doc: docRows,
                c_rel_code: self.c_rel_code,
                c_sys_code : self.args.c_sys_code,
                c_kind_no : self.c_kind_no 
            },
            onSuccess: function(jqXHR, textStatus, data) {
                if (data.model.status === CONSTANTS.E_YES_OR_NO.YES.c_code) {
                    var node = docRows;
                    for (var i = 0; i < node.length; i++) {
                        node[i].c_title = node[i].c_cname;
                        if (node[i].c_is_must != '') {
                            var must = node[i].c_is_must == CONSTANTS.E_YES_OR_NO.YES.c_code ? "(必须)" : "(非必须)";
                            node[i].c_title += must;
                        }
                    }
                    self.ztreeObj.addNodes(self.currentTreeNode, node);
                    //删除表格中的选中数据
                    self.$refs.docClasFormTb.store.commit('deleteSelection');
                }
                self.relativeLoading = false ;
                ELEMENT.Message.success(data.model.message);
            },
            onError: function(jqXHR, textStatus, data) {
                self.relativeLoading = false ;
                ELEMENT.Message.error(data.message);
            }
        });
      }
    },
    hanldeReload: function(value , old){
      if(value && value !== old){
        this.loadZtree();
        this.showDocs = false ;
        this.rows = [] ;
      }
    }
  },
  computed: {
    "switchOption": function() {
      return {
        onText: CONSTANTS.E_YES_OR_NO.YES.c_cname,
        offText: CONSTANTS.E_YES_OR_NO.NO.c_cname,
        onValue: CONSTANTS.E_YES_OR_NO.YES.c_code,
        offValue: CONSTANTS.E_YES_OR_NO.NO.c_code
      };
    },
    setting: function() {
      var self = this  ;
      return {
        view: {
          addHoverDom: function(treeId, treeNode) {
              if (!treeNode.isParent || treeNode.level == 0) {
                  return false;
              }
              var sObj = $("#" + treeNode.tId + "_span");
              if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
              var addStr = "<span class='el-icon-note-lock treeNode-add' id='addBtn_" + treeNode.tId +
                  "' title='关系单证' onfocus='this.blur();'></span>";
              sObj.after(addStr);
              var btn = $("#addBtn_" + treeNode.tId);
              if (btn) btn.on("click", function() {
                  self.c_rel_code = treeNode.c_code;
                  self.currentTreeNode = treeNode;
                  self.query(true);
                  return false;
              });
          },
          removeHoverDom: function(treeId, treeNode) {
              $("#addBtn_" + treeNode.tId).off().remove();
          },
          selectedMulti: false
        },
        edit: {
          enable: true,
          showRemoveBtn: function(treeId, treeNode) {
              return !treeNode.isParent;
          },
          showRenameBtn: false
        },
        callback: {
          beforeRemove: function(treeId, treeNode) {
              //删除单证分类关联
              ELEMENT.MessageBox.confirm("是否删除" + treeNode.c_cname, '提示' ).then(function() {
                  util.request({
                      serviceId: 'IMG00014',
                      tranCode: 'IMG0000014',
                      model: {
                          c_doc_code: treeNode.c_code,
                          c_rel_code: treeNode.c_par_code,
                          c_sys_code: self.args.c_sys_code,
                          c_kind_no: self.c_kind_no,
                      },
                      onSuccess: function(jqXHR, textStatus, data) {
                          if (data.model.status == CONSTANTS.E_YES_OR_NO.YES.c_code) {
                              var par = treeNode.getParentNode();
                              self.ztreeObj.removeNode(treeNode);
                              par.isParent = true;
                          }
                      },
                      onError: function(jqXHR, textStatus, data) {
                          ELEMENT.Message.error(data.message);
                      }
                  });
              });
              return false;
          },
          onClick: function(e, treeId, treeNode) {},
          beforeCollapse: function(treeId, treeNode) {
              if (treeNode.level == 0)
                  return false;
          },
          beforeExpand: function(treeId, treeNode) {
              var par = treeNode.getParentNode();
              if (treeNode.level == 1) {
                  if (par.children) {
                      var childrens = par.children;
                      for (var i in childrens) {
                          self.ztreeObj.expandNode(childrens[i], false);
                      }
                  }
              }
              return true;
          },
          onExpand: function(e, treeId, treeNode) {
              if (treeNode.isParent && treeNode.level != 0) {
                  //展开子节点
                  var childrens = treeNode.children;
                  for (var i in childrens) {
                      self.ztreeObj.expandNode(childrens[i], true, true, false, false);
                  }
              }
          },
          //禁止拖拽
          beforeDrag: function(treeId, treeNodes) {
              return false;
          },
          beforeDrop: function(treeId, treeNodes, targetNode, moveType) {
              return false;
          }
        },
        check: {
            enable: false
        },
        data: {
            key: {
                name: "c_title",
                title: "c_title"
            },
            simpleData: {
                enable: true,
                idKey: "c_code",
                pIdKey: "c_par_code",
            },
            keep: {
                parent: true,
                left: true
            }
        }
      }; //end for setting return
    }
  },
  mounted: function(){
    this.$watch("args.c_sys_code" , this.hanldeReload);
    this.$watch("c_kind_no" , this.hanldeReload);
    this.c_kind_no = this.args.c_kind_no;
    if(this.c_kind_no){
        this.loadZtree();
    }
  },
  beforeDestroy: function(){
    this.destroyZtreeObj();
  }
});

}); //End doc-classify
