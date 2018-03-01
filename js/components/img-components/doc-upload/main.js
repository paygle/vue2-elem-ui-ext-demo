/** doc-upload component */
define([
  'jquery.ztree',
  'ztree.exhide',
  "vue",
  "utilExt",
  "lodash",
  'mixins/emitter',
  'text!uploader/doc-upload/main.tpl',
  'uploader/constants/img-constants',
  "uploader/doc-upload/components/imgcompare/index",       //图片比较组件
  "uploader/doc-upload/components/doc-upload-dialog/main", //影像上传弹出框
  "uploader/doc-upload/components/doc-preview/main",       //影像预览组件
], function(
    Ztree,
    ztExhide,
    Vue,
    util,
    lodash,
    emitter,
    tpl,
    CONSTS,
    Imgcompare,
    DocUploadDialog,
    DocPreview
  ){

var debounce = lodash.debounce;
var merge = lodash.merge;
var CONSTANTS = CONSTS.CONSTANTS;
Vue.use(Imgcompare.directive);

return Vue.component('doc-upload', {
  template: tpl,
  cName : '单证上传',
  componentName: 'DocUpload',
  mixins: [emitter],
  props:{
    modal: {           // 是否模态
      type: Boolean,
      default: true
    },
    args:[Array, Object],     // mesh-tabs 组件传入参数
    server : String , //影像存储地址,
    viewServer : String, //预览地址
    disUploadBtn :{ //是否禁用上传按键
      type : Boolean ,
      default : false
    },
    chunked : {
      type : Boolean,
      default : false , //是否启用分片断点续传，默认为否
    }
  },
  data: function() {
    return {
      paramAttchRule: {}, //单证上传规则管控
      collect:[],  //tree filter conditions
      mustDisabled: false ,
      waitDisabled: false ,
      notece: {},
      treeLoading: false ,
      isEmpty: false ,
      collectLoading: false ,
      checkLen	: '',//预览模块中被选中的item数
      fileInfo		: '',//下载使用的影像json字符串
      dfserv      : '',//下载影像的服务请求action
      ztreeId: 'docTreeZ'+ new Date().getTime(),
      displayCollectBtn : false  //是否显示收齐按钮，包含强制收齐与实际收齐
    };
  },
  computed: {
    setting: function() {
        var self = this ;
        return {
          view: {
            /* 隐藏单证浮动收齐按钮
            addHoverDom: debounce(function(treeId, treeNode) {
                if (treeNode.level != 1) {
                    return false;
                }
                var sObj = $("#" + treeNode.tId + "_span");
                if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
                var addStr = "<button type='button' class='btn btn-primary' id='addBtn_" + treeNode.tId +
                    "'>收齐</button>";
                sObj.after(addStr);
                var btn = $("#addBtn_" + treeNode.tId);
                var dtl = treeNode ;
                if (dtl && (dtl.c_is_all_task == CONSTANTS.E_YES_OR_NO.YES.c_code || dtl.c_is_all == CONSTANTS.E_YES_OR_NO.YES.c_code))
                    btn.attr('disabled', true);
                if (btn) $('#'+ treeId).on("click",'#addBtn_' + treeNode.tId, debounce(function() {
                    $('#addBtn_' + treeNode.tId).attr('disabled', true); //避免多次点击收齐
                    self.submit({ "node" : treeNode }, $(this));
                },200));
            },200,{leading:false, trailing:true}),
            removeHoverDom: function(treeId, treeNode) {
                $("#addBtn_" + treeNode.tId).off().remove();
            },*/
            selectedMulti: false
          },
          edit: {
            enable: true,
            showRemoveBtn: false ,
            showRenameBtn: false
          },
          callback: {
            beforeRemove: function(treeId, treeNode) {
                return false;
            },
            onClick: function(e, treeId, treeNode) {
                var node = util.getOriginalData(treeNode);
                self.notece = node ;
            },
            beforeCollapse: function(treeId, treeNode) {
                //根节点不能收起
                if (treeNode.level == 0)
                    return false;
            },
            beforeExpand: function(treeId, treeNode) {
                var par = treeNode.getParentNode();
                if (treeNode.level == 1) {
                    if (par.children) {
                        var childrens = par.children;
                        for (var i in childrens) {
                            $.fn.zTree.getZTreeObj(self.ztreeId).expandNode(childrens[i], false);
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
                        $.fn.zTree.getZTreeObj(self.ztreeId).expandNode(childrens[i], true, true, false, false);
                    }
                }
            },
            //禁止拖拽
            beforeDrag: function(treeId, treeNodes) {
                return false;
            },
            beforeDrop: function(treeId, treeNodes, targetNode, moveType) {
                return false;
            },
            onCheck : function(event , treeId, treeNode){
                //判断兄弟节点是否全部勾选，是则就将父节点勾选
                if(!treeNode.getParentNode()) return ;
                var siblings = treeNode.getParentNode().children || [];
                var flag = true ;
                for(var i=0 ; i< siblings.length ; i ++){
                    if(!siblings[i].checked){
                        flag = false ;
                        break ;
                    }
                }
                $.fn.zTree.getZTreeObj(self.ztreeId).checkNode(treeNode.getParentNode(), flag, false ,false ) ;
            }
          },
          check: {
            enable: true,
            chkStyle: "checkbox",
            chkboxType: { "Y" : "s", "N" : "s" }
          },
          data: {
            key: {
                name: "c_title",
                title: "c_title"
            },
            simpleData: {
                enable: true,
                idKey: "c_pk_id",
                pIdKey: "c_snr_doc_code",
            },
            keep: {
                parent: true,
                left: true
            }
          }
        };//end for setting return
    },// end for setting funtcion
    enableUpload: function(){
      return this.notece.level && this.notece.level!==0 || !this.disUploadBtn;
    }
  },//end for computed
  methods:{
    showOrder: function(command){
      this.$refs.docPreview.reload(command);
    },
    download: function() {
      //下载勾选的影像资料
      var self = this ;
      if (self.checkLen > 0 || true) {
        ELEMENT.MessageBox.confirm("是否下载勾选的影像",'提示').then(function() {
          var images = self.$refs.docPreview.getCheckedImages();
          var fileInfo = images.map(function(item){ return {
              fileId : item.c_new_image_id || item.c_image_id ,
              fileName : item.c_name
          }; });
          self.fileInfo = JSON.stringify(fileInfo);
          setTimeout(function(){$('form.df').submit();},50);
        });
      }
    },
    deleteImg: function() { //影像删除
      var self = this ;
      if (self.checkLen > 0) {
        ELEMENT.MessageBox.confirm("是否删除选中的影像","提示").then(function() {
          var images = self.$refs.docPreview.getCheckedImages();
          images = images.map(function(item){ return item.c_image_id; });
          util.request({
            serviceId: '25000023',
            tranCode: 'IMG0000023',
            model: {
                c_busi_no : self.args.c_busi_no ,
                c_image_id: images
            },
            loadingMessage: '正在删除，请稍候',
            onSuccess: function(jqXHR, textStatus, data) {
                if(CONSTANTS.E_YES_OR_NO.YES.c_code === data.model.status ){
                    self.$refs.docPreview.removeImages(images);
                }
            },
            onError: function(jqXHR, textStatus, data) {
                ELEMENT.Message.error(data.message);
            }
          });
        });
      }
    },
    submit: debounce(function(params, btn ) {
      btn.attr('disabled', 'disabled');
      var self = this ;
      util.request({
        serviceId: '25000022',
        tranCode: 'IMG0000022',
        model: {
          c_co_busi_no: this.args.c_co_busi_no,
          c_busi_no: this.args.c_busi_no,
          c_sub_busi_no : params.node.c_sub_busi_no ,
          c_emp_code: util.getCurrentUser().c_oper_code,
          c_dept_code: util.getCurrentUser().current_dept_code
        },
        onSuccess: function(jqXHR, textStatus, data) {
          ELEMENT.Message.success(data.model.message) ;
          if(CONSTANTS.E_YES_OR_NO.YES.c_code === data.model.status ){
              self.$emit("collect", data.model.doc) ;
          }
        },
        onError: function(jqXHR, textStatus, data) {
          ELEMENT.Message.error(data.message);
          btn.removeAttr('disabled');
        }
      });
    },200, {leading:true, trailing:false}),
    getc_pk_ids: function(node) { //获取一个树节点下的所有子节点的主键值，返回一个数组
      //树的队列
      var queue = [];
      //遍历取到的主键值
      var pks = [];
      //当前树节点
      var t = node;
      if (t) {
        pks.push(t.c_pk_id);
        queue.push(t);
      }
      while (queue.length > 0) {
        t = queue.shift(); //取头部节点
        if ($.isArray(t.children)) {
          for (var i = 0; i < t.children.length; i++) {
            pks.push(t.children[i].c_pk_id);
            queue.push(t.children[i]);
          }
        }
      }
      return pks;
    },
      //加载数据并初始化树状选择器
    loadZtree : function() {
      var self = this ;
      self.treeLoading = true ;
      util.request({
        serviceId : '25000021',
        tranCode  : 'IMG0000021',
        model:{
            c_co_busi_no : self.args.c_co_busi_no , //合并单号
            c_busi_no: self.args.c_busi_no, //业务单号
            c_sub_busi_no:	self.args.c_sub_busi_no , //分单号
        },
        loadingMessage:"正在加载单证树形",
        onSuccess : function(jqXHR, textStatus, data){
            //单证收集状态
            var node = data.model.list ;
            if(node.length>0){
                self.isEmpty = false;
                //node[0].nocheck = true ; //根节点不允许有多选框
            }
            else
                self.isEmpty = true;
            for(var i=0;i<node.length;i++){
                //node[i].isParent = true;
                //节点显示名称拼凑
                node[i].c_title = node[i].c_doc_name;
                //设置单证节点的显示名称
                if(node[i].c_remark!=''){
                    node[i].c_title += node[i].c_remark;
                }
                if(node[i].c_is_must!=''){
                    var must = node[i].c_is_must=="1"?"(必须)":"(非必须)";
                    node[i].c_title +=must ;
                }
                node[i].chkDisabled = CONSTANTS.E_YES_OR_NO.YES.c_code === node[i].c_is_all ;
                node[i].checked = CONSTANTS.E_YES_OR_NO.YES.c_code === node[i].c_is_all ;
            }
            var treeObj = $.fn.zTree.init($("#"+self.ztreeId), self.setting, node);
            treeObj.expandNode(treeObj.getNodes()[0],true,false,false,false);
            treeObj = null ;
            self.treeLoading = false ;
            //初始化收齐按钮管控
            self.displayCollectBtn = CONSTANTS.E_YES_OR_NO.YES.c_code === data.model.c_is_allow ;
        },
        onError :function(jqXHR, textStatus, data){
            self.treeLoading = false ;
            ELEMENT.Message.error(data.message);
        }
      });
    },
    /**实际收齐 */
    allCollect : function(c_is_frc){
      var self = this ;
      c_is_frc = c_is_frc === CONSTANTS.E_YES_OR_NO.YES.c_code ? CONSTANTS.E_YES_OR_NO.YES.c_code : CONSTANTS.E_YES_OR_NO.NO.c_code ;
      ELEMENT.MessageBox.confirm('是否'+ (c_is_frc === CONSTANTS.E_YES_OR_NO.YES.c_code ? '强制':'实际') + '收齐该事故下选中的单证','提示').then(function(){
        self.collectLoading = true ;
        var nodes = $.fn.zTree.getZTreeObj(self.ztreeId).getCheckedNodes(true);
        var dtl = nodes.map(function(item){ return { c_pk_id : item.c_pk_id };});
        util.request({
          serviceId: '25000022',
          tranCode: 'IMG0000022',
          model: {
            c_co_busi_no: this.args.c_co_busi_no,
            c_busi_no: this.args.c_busi_no,
            c_emp_code: util.getCurrentUser().c_oper_code,
            c_dept_code: util.getCurrentUser().current_dept_code,
            c_is_frc : c_is_frc || CONSTANTS.E_YES_OR_NO.NO.c_code ,
            dtl : dtl
          },
          onSuccess: function(jqXHR, textStatus, data) {
            if (CONSTANTS.E_YES_OR_NO.YES.c_code === data.model.status) {
              self.$emit("collect", data.model.doc) ;
              //将根节点下的全部收齐状态置为是
              if (c_is_frc === CONSTANTS.E_YES_OR_NO.NO.c_code) {
                nodes.forEach(function(item){
                  $.fn.zTree.getZTreeObj(self.ztreeId).setChkDisabled(item, true );
                  item.c_is_all = CONSTANTS.E_YES_OR_NO.YES.c_code ;
                });
              }
            }
            self.collectLoading = false;
            ELEMENT.Message.success(data.model.message);
          },
          onError: function(jqXHR, textStatus, data) {
            ELEMENT.Message.error(data.message);
            self.collectLoading = false;
          }
        });
      });
    },
    /**强制收齐*/
    forceCollect:function(){
        this.allCollect(CONSTANTS.E_YES_OR_NO.YES.c_code);
    },
    showNodes: function() {
        var zTree = $.fn.zTree.getZTreeObj(this.ztreeId) ,
        nodes = zTree.getNodesByParam("isHidden", true);
        zTree.showNodes(nodes);
    },
    //需收与行收的过滤
    treeFilter: function(flag) {
      var self = this, notMustNodes;
      if (flag == '0') {
        //过滤出需收
        notMustNodes = $.fn.zTree.getZTreeObj(self.ztreeId).getNodesByParam("c_is_must", CONSTANTS.E_YES_OR_NO.NO.c_code);
        $.fn.zTree.getZTreeObj(self.ztreeId).hideNodes(notMustNodes);
      } else if (flag == '1') {
        //过滤出待收
        notMustNodes = $.fn.zTree.getZTreeObj(self.ztreeId).getNodesByParam("c_is_all", CONSTANTS.E_YES_OR_NO.YES.c_code);
        $.fn.zTree.getZTreeObj(self.ztreeId).hideNodes(notMustNodes);
      }
    },
    handlerUploadImages: function(images){
      //处理上传成功后 影像的预览
      this.$refs.docPreview.setImages(images);
      this.$emit("uploadFinished", images);
    },
    upload: function(){
      if(this.notece.c_pk_id && this.notece.c_pk_id !==''){
        this.$refs.uploadDialog.open() ;
      }else{
        ELEMENT.Message.info('请选择单证进行影像上传');
      }
    },
    handlerCheckLen: function(len){
      this.checkLen = len ;
    },
    destroyZtreeObj: function(){ //销毁ztree对象
      var treeObj = $.fn.zTree.getZTreeObj(this.ztreeId) ;
      $.fn.zTree.destroy(this.ztreeId);
      if(treeObj.setting){
          treeObj.setting.treeObj.remove();
          delete treeObj.setting.callback ;
          delete treeObj.setting.treeObj ;
      }
      treeObj = null ;
    },
    compare: function(){
      this.openCompare = false ;
      this.$nextTick(function(){
          this.openCompare = true ;
      });
      var instance = Imgcompare.service({
          fullscreen: true ,
          rows : this.$refs.docPreview.getCheckedImages(),
          server : this.viewServer ,
      });
    },
    queryParamAttchRule: function(){
        var self = this ;
        util.request({
        "model" :{
            c_sys_code : this.args.c_sys_code ,
            c_kind_no : this.args.c_kind_no
        },
        "tranCode" :"IMG0000001",
        "serviceId" :"25000001",
        "onSuccess" : function(jqXHR, textStatus, data) {
          self.$set(self,"paramAttchRule", data.model.rule);
        },
        "onError" : function(jqXHR, textStatus, data) {
          //ELEMENT.Message.error(data.message);
        }
      });
    },
    getZtreeId(){
      return this.ztreeId ;
    },
    getSelectNode(){
      return this.notece ;
    }
  },
  watch:{
    collect: function(val){
      var self = this ;
      self.showNodes();
      for(var i =0 ; i<val.length;i++){
        self.treeFilter(val[i]);
      }
    }
  },
  mounted: function(){
    this.loadZtree();
    this.queryParamAttchRule();
  },
  beforeDestroy: function(){
    this.destroyZtreeObj() ;
  }
});

}); //End doc-upload
