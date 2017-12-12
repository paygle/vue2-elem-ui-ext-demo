/** fullview-main component */
define([
  "vue",
  'text!uploader/doc-upload/components/fullview/fullview-main/main.tpl',
  'uploader/doc-upload/components/utils/interact',
  'uploader/doc-upload/components/utils/transform',
], function(
  Vue,
  tpl,
  interact,
  Transform
){
  'use strict';

return Vue.component('fullview-main', {
  template: tpl,
  data: function() {
    return {
      id: 'fullView' + new Date().getTime(), //当前页面唯一标识
      visible: false,
      customClass: '',
      rows: [], //图片信息
      server: "",
      //onEdit : function(el){}, //编辑回调
      //onDelete : function(el){}, //删除回调
      currentEl: {}, //当前显示图片
      uploadServer : '' , //服务器上传地址
      transformMap : {} // 图片操作参数 transfrom scale(x,y) rotate(angle) translate(x,y)
    };
  },
  computed: {
    original: function() {
      return this.server + "/original/";
    },
    thumb: function() {
      return this.server + "/thumb/";    // 压缩图片
    },
    nextIndex: function() {
      var i = this.currentIndex * 1 + 1;
      if (i > this.rows.length) {
        i = this.rows.length - 1;
      }
      return i;
    }
  },
  methods: {
    handleAfterLeave: function() {
      this.$emit('after-leave');
      this.visible = false;
    },
    handleClose: function() {
      this.visible = false;
      this.close();
      this.handleAfterLeave();
    },
    next: function(flag) {
      var index = 0;
      for (var i = 0; i < this.rows.length; i++) {
          if (this.currentEl.c_image_id === this.rows[i].c_image_id) {
              index = i;
              break;
          }
      }
      index = flag ? index + 1 : index - 1;
      if (this.rows[index]) this.currentEl = this.rows[index];
    },
    //查看原图
    switchImage: function(){
      var src = this.currentEl.src ;
      if(src === this.currentEl.c_new_image_id){
          src = this.currentEl.c_image_id ;
      }else if (this.currentEl.c_new_image_id) {
          src = this.currentEl.c_new_image_id;
      }
      this.currentEl.src = src;
      this.$set(this.rows, this.getCurrentIndex(), this.currentEl) ;
    },
    //获取当前显示图片下标索引
    getCurrentIndex: function(){
      var index = 0;
      for (var i = 0; i < this.rows.length; i++) {
        if (this.currentEl.c_image_id === this.rows[i].c_image_id) {
          index = i;
          break;
        }
      }
      return index ;
    },
    toEdit: function(){
      var el = this.currentEl ;
      //this.onEdit.call(this, el);
      this.$emit("onEdit", el) ;
    },
    toDelete: function(){
      ELEMENT.MessageBox.confirm("是否删除选中的影像",'提示').then(function(){
        var el = this.currentEl ;
        var index = this.getCurrentIndex();
        this.rows.splice(index, 1) ;
        if(this.rows.length === 0 ){
          this.handleClose();
        }
        if(index < this.rows.length ){
          this.$set(this, 'currentEl', this.rows[index] );
        }else{
          this.$set(this, 'currentEl', this.rows[this.rows.length]);
        }
        //this.onDelete.call(this, el);
        this.$emit("onDelete", el) ;
      });
    },
    //放大缩小
    zoom: function(c_image_id, e) {
      var delta = (e.wheelDelta && (e.wheelDelta > 0 ? 1 : -1)) || // chrome & ie
          (e.detail && (e.detail > 0 ? -1 : 1)); // firefox
      var map = this.transformMap[c_image_id] || new Transform() ;
      //大于零 上滑  放大
      if(delta > 0){
        map.setScale(true);
      }else{
      //下滑 缩小
        map.setScale(false);
      }
      this.$set(this.transformMap, c_image_id, map);
    },
    zoomSpan: function(flag){
      var c_image_id = this.currentEl.c_image_id ;
      var map = this.transformMap[c_image_id] || new Transform() ;
      //大于零 上滑  放大
      map.setScale(flag) ;
      this.$set(this.transformMap, c_image_id, map);
    },
    rotate: function(flag){
      var c_image_id = this.currentEl.c_image_id ;
      var map = this.transformMap[c_image_id] || new Transform() ;
      //大于零 上滑  放大
      map.setRotate(flag) ;
      this.$set(this.transformMap, c_image_id, map);
    },
    dragMoveListener: function(event) {
      var self = this ;
      var map = self.transformMap[self.currentEl.c_image_id] || new Transform();
      var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (map.translateX || 0) + event.dx,
          y = (map.translateY || 0) + event.dy;
      // translate the element
      map.setTranslate(x,y);
      self.$set(self.transformMap, self.currentEl.c_image_id , map);
    }
  },
  created: function(){
    if(this.rows){
      this.rows.forEach(function(item){
        item.src = item.c_new_image_id || item.c_image_id ;
      });
    }
  },
  mounted: function() {
    this.$nextTick(function(){
      interact('.LookPicture .Look_img', {context :  document.querySelector(this.id)})
      .draggable({
        // enable inertial throwing
        inertia: true,
        // restrict: {
        //     restriction: "parent",
        //     endOnly: true,
        //     elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        // },
        // enable autoScroll
        autoScroll: true,
        onmove: this.dragMoveListener
      });
    });
  },
  beforDestroy: function() {
    interact(".LookPicture .Look_img").unset();
    this.close();
  }
});

}); //End fullview-main
