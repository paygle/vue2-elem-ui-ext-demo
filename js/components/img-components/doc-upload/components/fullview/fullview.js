/** fullview */
define([
  "vue",
  "lodash",
  'uploader/doc-upload/components/fullview/fullview-main/main'
], function(
  Vue,
  lodash,
  mainVue
){
  'use strict';

var merge = lodash.merge;
var MainConstructor = Vue.extend(mainVue);

var defaults = {
  rows: [],
  server : '' ,
  customClass: ''
};

MainConstructor.prototype.originalPosition = '';
MainConstructor.prototype.originalOverflow = '';

MainConstructor.prototype.close = function() {
  document.body.style.overflow = this.originalOverflow;
  document.body.style.position = this.originalPosition;
  this.target.style.position = this.originalPosition;
  this.visible = false;
  this.$off("onEdit");
  this.$off("onDelete");
  this.$el &&
  this.$el.parentNode &&
  this.$el.parentNode.removeChild(this.$el);
  this.$destroy();
};

var addStyle = function(options, parent, instance) {
  var maskStyle = {};
  instance.originalPosition = document.body.style.position;
  instance.originalOverflow = document.body.style.overflow;
  Object.keys(maskStyle).forEach(function(property) {
    instance.$el.style[property] = maskStyle[property];
  });
};

var MainIinstance = function(options) {
  if (Vue.prototype.$isServer) return;
  options = merge({}, defaults, options || {});
  options.target = document.body;
  var parent = document.body ;
  var onEdit = options.onEdit ;
  var onDelete = options.onDelete ;
  delete options.onEdit ;
  delete options.onDelete ;
  var instance = new MainConstructor({
    el: document.createElement('div'),
    data: options
  });
  instance.$on("onEdit", onEdit);
  instance.$on("onDelete", onDelete);
  addStyle(options, parent, instance);
  if (instance.originalPosition !== 'absolute') {
    parent.style.position = 'relative';
  }
  parent.style.overflow = 'hidden';
  parent.appendChild(instance.$el);
  Vue.nextTick(function(){
    instance.visible = true;
  });
  return instance;
};

return MainIinstance;

}); //End fullview
