/** imgcompare service */
define([
  "vue",
  "lodash",
  'uploader/doc-upload/components/imgcompare/src/imgcompare-main/main'
], function(
  Vue,
  lodash,
  mainVue
){
  'use strict';
var merge = lodash.merge;
var CompareConstructor = Vue.extend(mainVue);
var defaults = {
  fullscreen: true,
  rows: [],
  server : '' ,
  customClass: ''
};

var fullscreenLoading;

CompareConstructor.prototype.originalPosition = '';
CompareConstructor.prototype.originalOverflow = '';

CompareConstructor.prototype.close = function() {
  if (this.fullscreen && this.originalOverflow !== 'hidden') {
    document.body.style.overflow = this.originalOverflow;
  }
  if (this.fullscreen || this.body) {
    document.body.style.position = this.originalPosition;
  } else {
    this.target.style.position = this.originalPosition;
  }
  if (this.fullscreen) {
    fullscreenLoading = undefined;
  }
  this.visible = false;
  this.$el &&
  this.$el.parentNode &&
  this.$el.parentNode.removeChild(this.$el);
  this.$destroy();
};

var addStyle = function(options, parent, instance) {
  var maskStyle = {};
  if (options.fullscreen) {
    instance.originalPosition = document.body.style.position;
    instance.originalOverflow = document.body.style.overflow;
  } else if (options.body) {
    instance.originalPosition = document.body.style.position;
    ['top', 'left'].forEach(function(property) {
      var scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
      maskStyle[property] = options.target.getBoundingClientRect()[property] +
        document.body[scroll] +
        document.documentElement[scroll] +
        'px';
    });
    ['height', 'width'].forEach(function(property) {
      maskStyle[property] = options.target.getBoundingClientRect()[property] + 'px';
    });
  } else {
    instance.originalPosition = parent.style.position;
  }
  Object.keys(maskStyle).forEach(function(property){
    instance.$el.style[property] = maskStyle[property];
  });
};

return function ImgCompare(options) {
  if (Vue.prototype.$isServer) return;
  options = merge({}, defaults, options || {});
  options.fullscreen = true ;
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target);
  }
  options.target = options.target || document.body;
  if (options.target !== document.body) {
    options.fullscreen = false;
  } else {
    options.body = true;
  }
  if (options.fullscreen && fullscreenLoading) {
    return fullscreenLoading;
  }

  var parent = options.body ? document.body : options.target;
  var instance = new CompareConstructor({
    el: document.createElement('div'),
    data: options
  });

  addStyle(options, parent, instance);
  if (instance.originalPosition !== 'absolute') {
    parent.style.position = 'relative';
  }
  if (options.fullscreen ) {
    parent.style.overflow = 'hidden';
  }
  parent.appendChild(instance.$el);
  Vue.nextTick(function(){
    instance.visible = true;
  });
  if (options.fullscreen) {
    fullscreenLoading = instance;
  }
  return instance;
};

}); //End imgcompare service