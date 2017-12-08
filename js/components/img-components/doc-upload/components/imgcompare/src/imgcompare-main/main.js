/** fullview-main component */
define([
  'vue',
  'utils/dom',
  'text!uploader/doc-upload/components/fullview/fullview-main/main.tpl',
  'uploader/doc-upload/components/utils/interact',
  'uploader/doc-upload/components/utils/transform',
], function(
  Vue,
  dom,
  tpl,
  interact,
  Transform
){
  'use strict';
var setStyle = dom.setStyle;

return Vue.component('imgcompare-main', {
  template: tpl,
  data: function() {
    return {
      id : 'imgMain'+ new Date().getTime() , //当前页面唯一标识
      fullscreen: true,
      visible: false,
      customClass: '',
      rows: [] , //图片信息
      server : "",
      isResizing : false , //标识是否正常调整div panl大小
      currentIndex : 0 , //当前移动下标识
      panlWidth : 500  , //图片初始化大小
      panlHeight : 500 , //图片初始化大小
      innerWidth : 0 , //窗口宽度
      innerHeight : 0 , //窗口高度
      positionMap : [] , //绝对定位top left 
      transformMap : {} ,  //放大缩小参数 key index
      moveMap : {} , //移动参数 key index
      visibleFull : false  //是否显示全屏图片
    };
  },
  computed:{
      original: function(){
          return this.server + "/original/";
      },
      thumb: function(){
          return this.server + "/thumb/";
      },
      nextIndex: function(){
        var i = this.currentIndex*1 + 1 ;
        if(i > this.rows.length ){
          i = this.rows.length - 1 ;
        }
        return i ;
      }
  },
  methods: {
    handleAfterLeave: function() {
      this.$emit('after-leave');
    },
    setText: function(text) {
      this.text = text;
    },
    handleClose: function(){
      this.visible = false ;
      this.handleAfterLeave();
      this.close();
    },
    //拖拽
    startDrag: function(event){
      this.isResizing = true ;
      this.currentIndex = event.target.getAttribute("index");
    },
    updateDrag: function(event){
      if (!this.isResizing || !event.target.getAttribute) 
          return;
      var index = event.target.getAttribute("index");
      var targetDiv = document.getElementById(this.id + 'panl' + this.currentIndex) ;
      var nextDiv = document.getElementById(this.id + 'panl' + this.nextIndex ) ;
      // var mainDiv = document.getElementById(this.id + 'main') ;
      if(event.clientX+50 >= nextDiv.offsetLeft + nextDiv.offsetWidth){
        return ;
      }
      if(event.clientX < targetDiv.offsetLeft + 50){
        return ;
      }
      var targetWidth = event.clientX - targetDiv.offsetLeft;
      var move = targetDiv.offsetWidth - targetWidth ;
      var nextWidth = nextDiv.offsetWidth + move ;
      setStyle(targetDiv, 'width', targetWidth + 'px') ;
      setStyle(nextDiv, 'width', nextWidth + 'px') ;
    },
    stopDrag: function(event){
      this.isResizing = false ;
    },
    //放大缩小
    zoom: function(index, e) {
      this.currentIndex = index ;
      var delta = (e.wheelDelta && (e.wheelDelta > 0 ? 1 : -1)) || // chrome & ie
          (e.detail && (e.detail > 0 ? -1 : 1)); // firefox
      var map = this.transformMap[index] || new Transform() ;
      map.setScale(delta > 0);
      this.$set(this.transformMap, index, map);
    },
    //最大化
    zoomFull: function(index, flag){
      if(flag) this.currentIndex = index ; 
      this.$nextTick(function(){
        this.visibleFull = flag ;
      });
    },
    dragMoveListener: function(event) {
      var index = event.target.getAttribute('index'); 
      var map = this.transformMap[index] || new Transform();
      var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (map.translateX || 0) + event.dx,
          y = (map.translateY || 0) + event.dy;
      // translate the element
      map.setTranslate(x,y);
      this.$set(this.transformMap, index , map);
    },
    resizeListener: function(event){
      var index = event.target.getAttribute('index')*1; 
      var old = this.covertPosition(this.positionMap[index] , false);
      var map = this.covertPosition(this.positionMap[index] , false);
      if(event.rect.width < 50) return  ;
      var width = event.rect.width ;
      map.width  = width ;
      map.height = event.rect.height < 50 ? 50 : event.rect.height;
      map.left = event.rect.left ;
      //判断是从左边框拉扯
      if(old.left+(old.width/2) > event.pageX*1 ){
        flag = true ;
      }else if(old.left+(old.width/2) <= event.pageX*1 ){
        //从右边框拉扯
        flag = false ;
      }
      var w = map.width - old.width , _w = w, flag ;
      var _index = 0;
      var cood = flag ? 0 : (map.left + map.width);
      var start = flag ? 0 : (index+1) ;
      var end = flag ? index : this.rows.length ;
      var rows = this.positionMap.map(function(item, k){
        var _m = this.covertPosition(item, false) ;
        if(_m.width > 50 && (k>=start && k<end) ) _index ++ ;
        else if(_w < 0 && (k>=start && k<end) ) _index++;
        return _m ;
      });
      if(_index === 0 ) return ;
      w = w / _index ;
      for(var i = start ; i < end ; i++){
        cood += 10 ;
        var currentMap = rows[i];
        if(currentMap.width > 50 || (_w < 0 && currentMap.width <= 50)) {
          currentMap.width -= w ;
        }
        currentMap.left = cood ;
        cood = cood + currentMap.width ;
        this.$set(this.positionMap, i, this.covertPosition(currentMap , true) );
      }
      this.$set(this.positionMap, index, this.covertPosition(map , true) );
    },
    //flag 为true 将值转为带ps后缀的字符串，否则转换成数值
    covertPosition: function(map, flag){
      if(!map) return ;
      map = JSON.parse(JSON.stringify(map));
      var keys = Object.keys(map);
      if(flag){
        keys.forEach(function(item){
          map[item] = map[item]+'px' ;
        });
      }else{
        keys.forEach(function(item){
          map[item] = map[item].replace(/px/i, "")*1 ;
        });
      }
      return map;
    }
  },
  mounted: function(){
    setStyle(document.body, "cursor", "");
    var size = this.rows.length ;
    var result = (window.innerWidth-(10*size+10)) / size ;
    this.panlWidth =  Math.round(result);
    //获取窗口高度
    this.panlHeight = window.innerHeight ;
    this.innerWidth = window.innerWidth ;
    this.innerHeight = window.innerHeight ;
    
    this.$nextTick(function(){
      this.rows.forEach(function(item, index){
        if(this.positionMap[index-1]){
          var map = this.positionMap[index-1] ;
          var left = this.panlWidth + map.left.replace(/px/i, "")*1 + 10 ;
          this.positionMap[index] = { top : map.top , left : left+'px'  , width : map.width} ;
        }else{
          this.positionMap[index] = { top : 20+'px' , left : 10+'px', width : this.panlWidth+'px'} ;
        }

      });
      interact('.imgcompare-img',{context: document.querySelector(this.id+'main')})
      .draggable({
          // enable inertial throwing
          inertia: true,
          // enable autoScroll
          autoScroll: true,
          restrict: {
            restriction: "parent",
          },
          onmove: this.dragMoveListener
      });
      interact('.imgcompare-panl',{context: document.querySelector(this.id+'main')})
      .resizable({
        square: false,
        preserveAspectRatio: false,
        edges: { left: true, right: true, bottom: true, top: false },
        onmove : this.resizeListener
      });
    });
  },
  beforDestroy: function(){
    interact('.imgcompare-img').unset();
  }
});

}); //End fullview-main
