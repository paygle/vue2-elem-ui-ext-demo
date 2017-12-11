/** file-upload component */
define([
  "vue",
  "utilExt",
  "lodash",
  'mixins/emitter',
  'text!uploader/doc-upload/components/uploader/main.tpl'
], function(
  Vue,
  util,
  lodash,
  emitter,
  tpl
){
  'use strict';

var merge = lodash.merge;
var webUploaderUrl = APP_CONFIG.API_URL + 'static/js/uploader';
var option = {
  pick: {
    id: '',
    label: '点击选择图片'
  },
  formData: {},
  dnd: '.dndArea',
  paste: '.uploader',
  swf: webUploaderUrl + '/Uploader.swf',
  chunked: false,
  chunkSize: 512 * 1024,
  server: '',
  // runtimeOrder: 'flash',

  // accept: {
  //     title: 'Images',
  //     extensions: 'gif,jpg,jpeg,bmp,png',
  //     mimeTypes: 'image/*'
  // },

  // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
  disableGlobalDnd: true,
  fileNumLimit: 300,
  fileSizeLimit: 200 * 1024 * 1024, // 200 M
  fileSingleSizeLimit: 50 * 1024 * 1024, // 50 M
  //预览图片大小
  thumWidth: 110,
  thumHeight: 110
};

return Vue.component('uploader', {
  template: tpl,
  cName: '上传界面组件',
  componentName: 'Uploader',
  mixins: [emitter],
  props:{
    options: Object,
  },
  data: function() {
    return {
      // 添加的文件数量
      fileCount : 0,
      // 添加的文件总大小
      fileSize : 0,
      //上传失败文件数
      uploadFailNum : -1 ,
      // 优化retina, 在retina下这个值是2
      ratio : window.devicePixelRatio || 1,
      // 缩略图大小
      thumbnailWidth : 110 * this.ratio,
      thumbnailHeight : 110 * this.ratio,

      // 可能有pedding, ready, uploading, confirm, done.
      state : 'pedding',

      // 所有文件的进度信息，key为file id
      percentages : {},
      // 判断浏览器是否支持图片的base64
      isSupportBase64 : (function() {
          var data = new Image();
          var support = true;
          data.onload = data.onerror = function() {
              if (this.width != 1 || this.height != 1) {
                  support = false;
              }
          };
          data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
          return support;
      })(),

      // 检测是否已经安装flash，检测flash的版本
      flashVersion : (function() {
          var version;
          try {
              version = navigator.plugins['Shockwave Flash'];
              version = version.description;
          } catch (ex) {
              try {
                  version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                      .Getletiable('$version');
              } catch (ex2) {
                  version = '0.0';
              }
          }
          version = version.match(/\d+/g);
          return parseFloat(version[0] + '.' + version[1], 10);
      })(),

      supportTransition : (function() {
          var s = document.createElement('p').style,
              r = 'transition' in s ||
              'WebkitTransition' in s ||
              'MozTransition' in s ||
              'msTransition' in s ||
              'OTransition' in s;
          s = null;
          return r;
      })(),

      /*webuploader 实例*/
      uploader: null,
      imageIds:[], //上传成功的影像信息
      errors:[], // 上传的错误信息
      filePicker: 'filePicker'+new Date().getTime(),
      filePicker2: 'filePicker2'+new Date().getTime(),

      files:[] , //添加的上传文件
      isProgress : false ,// 是否显示总的进度条
    };
  },
  computed:{
    progressNum: function(){
      var percentages = this.percentages ;
      var loaded = 0,
          total = 0,
          percent;
      $.each(percentages, function(k, v) {
          total += v.size;
          loaded += v.size * v.progress;
      });
      percent = total ? loaded / total : 0;
      return (percent * 100).toFixed(2) *1 ;
    },
    information: function() {
      if(!this.uploader) return '' ;
      var text = '',
          stats;

      if (this.state === 'ready') {
        text = '选中' + this.fileCount + '张图片，共' +
            WebUploader.formatSize(this.fileSize) + '。';
      } else if (this.state === 'confirm') {
        stats = this.uploader.getStats();
        if (stats.uploadFailNum) {
            text = '已成功上传' + stats.successNum + '张照片，' +
                stats.uploadFailNum + '张照片上传失败';
            this.uploadFailNum = stats.uploadFailNum || -1 ;
        }else{
            text = '已成功上传' + stats.successNum + '张照片';
        }
      } else {
        stats = this.uploader.getStats();
        text = '共' + this.fileCount + '张（' +
            WebUploader.formatSize(this.fileSize) +
            '），已上传' + stats.successNum + '张';

        if (stats.uploadFailNum) {
            text += '，失败' + stats.uploadFailNum + '张';
        }
      }
      return text;
    },
    PREVIEW_TYPE: function(){ //文件能否预览标识类型
      return {
        PREVIEWING: -1 , //预览中
        PREVIEWED: 0,    //已预览成功
        PREVIEWFAIL: 1   //不能预览
      };
    }
  },

  methods: {
    /*初始化webuploader*/
    init: function(options) {
      // 实例化
      var self = this;
      var _options = merge({}, option, options, { pick: { id : '#'+self.filePicker , label: '点击选择图片' } });
      var uploader = WebUploader.create(_options);
      //保存上传后，影像系统返回的imageId
      this.imageIds = [];
      //存放错误信息数组
      this.errors = [];
      // 拖拽时不接受 js, txt 文件。
      uploader.on('dndAccept', function(items) {
          var denied = false,
              len = items.length,
              i = 0,
              // 修改js类型
              unAllowed = 'text/plain;application/javascript ';

          for (; i < len; i++) {
              // 如果在列表里面
              if (~unAllowed.indexOf(items[i].type)) {
                  denied = true;
                  break;
              }
          }

          return !denied;
      });

      // uploader.on('filesQueued', function() {
      //     uploader.sort(function( a, b ) {
      //         if ( a.name < b.name )
      //           return -1;
      //         if ( a.name > b.name )
      //           return 1;
      //         return 0;
      //     });
      // });

      // 添加“添加文件”的按钮，
      uploader.addButton({
          id: '#'+self.filePicker2,
          label: '继续添加'
      });
      /*uploader.on('ready', function() {
          window.uploader = uploader;
      });*/
      uploader.onUploadProgress = function(file, percentage) {
          file.progress = (percentage * 100).toFixed(2) * 1;
          self.percentages[file.id].progress = percentage;
          self.updataFile(file);
      };

      uploader.onFileQueued = function(file) {
          self.fileCount++;
          self.fileSize += file.size;

          self.addFile(file);
          self.state = 'ready';
      };

      uploader.onFileDequeued = function(file) {
          self.fileCount--;
          self.fileSize -= file.size;

          if (!self.fileCount) {
              self.state = 'pedding';
          }
      };

      uploader.on('all', function(type) {
        switch (type) {
          case 'uploadFinished':
              self.state = 'confirm';
              self.$emit('uploadFinished', {errors: self.errors, files: self.imageIds} );
              break;

          case 'startUpload':
              self.state = 'uploading';
              break;

          case 'stopUpload':
              self.state = 'paused';
              break;
        }
      });

      //监听文件上传成功，并接收服务器返回数据
      uploader.on('uploadSuccess', function(file, response) {
        if(response.files && response.files.length > 0 ){
          var resp = response.files.map(function(item){
            return {
              'c_image_id': item.fileId,
              'c_name': item.fileName
            };
          });
          Array.prototype.push.apply(self.imageIds, resp);
        }else if(response.errorMessage){
          self.errors.push({
            fileId: file.id,
            message: response.errorMessage
          });
          file.setStatus("invalid");
          file.infos = response.errorMessage ;
          ELEMENT.Message.error(response.errorMessage);
        }
      });
      uploader.onError = function(code) {
        ELEMENT.Message.error('Eroor: ' + code);
      };
      self.uploader = uploader;
    },
    startUpload: function(event){
        if(!WebUploader){
          ELEMENT.Message.info("上传组件正在加载");
          return ;
        }
        if ($(event.target).hasClass('disabled')) {
          return false;
        }
        if (this.state === 'ready') {
          this.uploader.upload();
        } else if (this === 'paused') {
          this.uploader.upload();
        } else if (this === 'uploading') {
          this.uploader.stop(true);
        }
    },
    handleRetry: function(){
      var newFiles = this.files.filter(function(file) {
        console.log(file.getStatus());
        return file.getStatus() !== 'invalid';
      });
      this.files = newFiles ;
      this.fileCount = this.files.length;
      this.uploader.retry();
    },
    updataFile: function(file){
      var idx = $.inArray(file, this.files) ;
      if(idx !== -1 )
        this.$set(this.files,idx,file) ;
    },
    panelMouseenter: function(file){
      file.isPanel = true ;
      this.updataFile(file);
    },
    panelMouseleave: function(file){
      file.isPanel = false ;
      this.updataFile(file);
    },
    panelRemove: function(file){
      this.uploader.removeFile(file);
      var idx = $.inArray(file, this.files);
      this.files.splice(idx, 1);
    },
    panelRight: function(file){
      file.rotation += 90;
      this.updataFile(file);
    },
    panelLeft: function(file){
      file.rotation -= 90;
      this.updataFile(file);
    },
    addFile: function(file) {
      var self = this ;

      file.progress = 0 ;//文件上传进度信息
      file.isProgress  = false ; //是否显示进度条
      file.isSuccess = false ;//是否上传成功
      file.isPanel = false ; //是否显示工具栏
      file.isInfos = false ;//是否显示上传提示信息
      file.infos = '' ;//文件上传提示信息
      file.isPreview = self.PREVIEW_TYPE.PREVIEWING ; //默认为预览中状态
      file.src = null ; //图片压缩成功后的src

      var showError = function(code) {
          var text = '';
          switch (code) {
              case 'exceed_size':
                  text = '文件大小超出';
                  break;

              case 'interrupt':
                  text = '上传暂停';
                  break;

              default:
                  text = '上传失败，请重试';
                  break;
          }
          file.infos = text ;
      };
      if (file.getStatus() === 'invalid') {
          showError(file.statusText);
      } else {
          file.isPreview = self.PREVIEW_TYPE.PREVIEWING ;
          self.uploader.makeThumb(file, function(error, src) {
              if (error) {
                  file.isPreview = self.PREVIEW_TYPE.PREVIEWFAIL ;
                  return;
              }
              if (self.isSupportBase64) {
                  file.isPreview = self.PREVIEW_TYPE.PREVIEWED ;
                  file.src = src ;
              }
              self.updataFile(file);
          }, self.thumbnailWidth, self.thumbnailHeight);
          //注册新属性
          self.$set(self.percentages, file.id,{ size: file.size, progress: 0} ) ;
          file.rotation = 0;
      }

      file.on('statuschange', function(cur, prev) {
        if (prev === 'progress') {
            file.isProgress = false ;
        } else if (prev === 'queued') {
            file.isPanel = false ;
        }

        // 成功
        if (cur === 'error' || cur === 'invalid') {
            self.errors.push({
                fileId: file.id,
                message: '上传错误'
            });
            showError(file.statusText);
            self.percentages[file.id].progress = 1;
            file.isSuccess = false ;
            file.isInfos = true ;
        } else if (cur === 'interrupt') {
            showError('interrupt');
        } else if (cur === 'queued') {
            self.percentages[file.id].progress = 0;
        } else if (cur === 'progress') {
            file.isInfos = false ;
            file.isProgress = true ;
            self.isProgress = true ;
        } else if (cur === 'complete') {
            file.isSuccess = true ;
        }
        self.updataFile(file);
      });
      self.files.push(file);
    }
  },
  watch:{
    fileCount: function(val){
      if(val>=1){
        var self = this;
        setTimeout(function(){
          var button = $('#'+self.filePicker2).children('.webuploader-pick'),
          width = button.outerWidth ? button.outerWidth() : button.width(),
          height = button.outerHeight ? button.outerHeight() : button.height(),
          pos = button.offset(),
          label = button.siblings();
          width && height && label.css({
              bottom: 'auto',
              right: 'auto',
              width: width + 'px',
              height: height + 'px'
          }).offset(pos);
        },50);
      }
    }
  },
  mounted: function(){
    this.init(this.options);
  }
});

}); //End file-upload