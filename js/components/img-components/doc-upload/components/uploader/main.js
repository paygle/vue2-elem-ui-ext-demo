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
    md5File: {
        type : Function,
        default : function(md5,promise){
            promise.resolve();
        }
    },
    offsetChange: {
        type : Function,
        default : function(file){}
    }
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

      uploader.on( 'uploadBeforeSend', function( block, data, headers ) {
        data.md5 = block.file.c_md5 ; // md5编码
        if(!(block.chunks === 1)){
            data.chunked = this.options.chunked ; //必传，是否启用分片上传
            data.groupId = block.file._info ? block.file._info.c_image_id : "" ;
            data.offset = block.start ;
        }
      });

      // 添加“添加文件”的按钮，
      uploader.addButton({
          id: '#'+self.filePicker2,
          label: '继续添加'
      });

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

      //在文件上传后，判断返回报文是否正常上传，返回false触发uploadError事件，否则相反
        uploader.on("uploadAccept", function(block, ret){
            var me = this , chunked = me.options.chunked ;
            if(ret && ret.files && ret.files.length > 0){
                var file = block.file ;
                var fileInfo = ret.files[0] ;
                file._info.c_image_id = fileInfo.fileId ; //影像id
                if(file._info.c_position) file._info.c_position[block.chunk] = "1" ;
                chunked && self.offsetChange(block.file);
                return true ;
            }else {
                return false
            };
        });

      //监听文件上传成功，并接收服务器返回数据
      uploader.on('uploadSuccess', function(file, response) {
      if(!response) {
            response = { files: [] } ;
            response.files.push({
                fileId: file._info.c_image_id,
                fileName : file._info.c_name
            });
        }
        if(response.files && response.files.length > 0 ){
           response.files.forEach(function(item) {
                var _file = {
                    'c_image_id': item.fileId,
                    'c_name': item.fileName,
                    'c_md5' : file.md5,
                    'c_position' : file._info.c_position ? file._info.c_position.join("") : "1"
                }
                for(var i=self.imageIds.length-1;i>=0;i-- ){
                    if(self.imageIds[i].c_image_id === _file.c_image_id){
                        self.imageIds[i] = _file ;
                        break ;
                    }
                    if(i==0){
                        self.imageIds.push(_file);
                    }
                }
                if(self.imageIds.length < 1){
                    self.imageIds.push(_file);
                }
            });
                    //Array.prototype.push.apply(self.imageIds, resp);
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
      //保证
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
  var self = this ;
    //继点续传判断
    WebUploader.Uploader.register(
        {
            "before-send-file" : "makeMd5", //计算文件的md5，用来判断是否为同一个文件
            "before-send" : "beforeSend"
        },
        {
            "makeMd5" : function(file){
                file._info = {} ; //初始化
                if(!self.options.chunked) return ; //不分片，不进行md5
                var me = this,
                owner = this.owner,
                deferred = WebUploader.Deferred();
                file.isProgress = true ;
                owner.md5File( file.source )
                // 如果读取出错了，则通过reject告诉webuploader文件上传出错。
                .fail(function() {
                    deferred.reject();
                })
                // 及时显示进度
                .progress(function(percentage) {
                    file.progress = percentage*100 ;
                })
                // 完成
                .then(function(val) {
                    file.md5 = val ;
                    // 接受此promise, webuploader接着往下走。
                    var waitMd5FileEvent = WebUploader.Deferred() ;
                    self.md5File(val, waitMd5FileEvent);
                    var chunked = self.options.chunked ; //必传，是否启用分片上传
                    waitMd5FileEvent.then(function(info){
                        file._info.n_total = file.size ;
                        if(file.size < self.options.chunkSize){
                            deferred.resolve();
                            return ;
                        }
                        if(!chunked || info.c_image_id) {
                            deferred.resolve();
                            return ;
                        }
                        //跨域支持
                        $.ajaxSetup({ 
                            crossDomain: true,
                            xhrFields: {
                                withCredentials: true
                            }
                        });
                        $.post( self.options.server , 
                            merge({
                                md5 : val,
                                chunked : chunked ,
                                size : file.size,
                                name : file.name,
                            }, self.options.formData, { operate : "chunkinit"}),
                            function(response){
                                if(response && response.files && response.files.length > 0){
                                    var fileInfo = response.files[0] ;
                                    file._info.c_image_id = fileInfo.fileId ; //影像id
                                    deferred.resolve();
                                }
                            } 
                        );
                    });
                });
                return deferred.promise();
            },
            "beforeSend": function(block) {
                if(!self.options.chunked) return ; //不分片，不进行md5校验
                deferred = WebUploader.Deferred();
                //deferred.resolve(); //接收该分片
                //deferred.reject();  //拒绝上传该分片
                //初始化c_position 按位标识分片
                if(!block.file._info.c_position){
                    block.file._info.c_position = [] ;
                    for(var i=0;i<block.chunks;i++){
                        block.file._info.c_position.push("0") ;
                    }
                }
                //执行判定逻辑
                if("1" === block.file._info.c_position[block.chunk]){
                    deferred.reject();
                }else
                    deferred.resolve(); 
                return deferred.promise();
            }
        }
    );
    this.init(this.options);
  }
});

}); //End file-upload