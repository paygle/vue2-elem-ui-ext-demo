/** ClickoutSide Utils */
define([
  'vue',
  'util'
], function(Vue, Util) {
  'use strict';
  var on = Util.on;

  var nodeList = [];
  var ctx = '@@clickoutsideContext';
  
  var startClick;
  
  !Vue.prototype.$isServer && on(document, 'mousedown', function(e){ startClick = e; });
  
  !Vue.prototype.$isServer && on(document, 'mouseup', function(e){ 
    nodeList.forEach(function(node){ node[ctx].documentHandler(e, startClick); });
  });
  /**
   * v-clickoutside
   * @desc 点击元素外面才会触发的事件
   * @example
   * ```vue
   * <div v-element-clickoutside="handleClose">
   * ```
   */
  return {
    bind: function(el, binding, vnode) {
      var id = nodeList.push(el) - 1;
      var documentHandler = function(mouseup, mousedown) {
        var mouseup = mouseup|| {}, mousedown = mousedown || {};
        if (!vnode.context ||
          !mouseup.target ||
          !mousedown.target ||
          el.contains(mouseup.target) ||
          el.contains(mousedown.target) ||
          el === mouseup.target ||
          (vnode.context.popperElm &&
          (vnode.context.popperElm.contains(mouseup.target) ||
          vnode.context.popperElm.contains(mousedown.target)))) return;
  
        if (binding.expression &&
          el[ctx].methodName &&
          vnode.context[el[ctx].methodName]) {
          vnode.context[el[ctx].methodName]();
        } else {
          el[ctx].bindingFn && el[ctx].bindingFn();
        }
      };
      el[ctx] = {
        id: id,
        documentHandler: documentHandler,
        methodName: binding.expression,
        bindingFn: binding.value
      };
    },
  
    update: function(el, binding) {
      el[ctx].methodName = binding.expression;
      el[ctx].bindingFn = binding.value;
    },
  
    unbind: function(el) {
      var len = nodeList.length;
  
      for (var i = 0; i < len; i++) {
        if (nodeList[i][ctx].id === el[ctx].id) {
          nodeList.splice(i, 1);
          break;
        }
      }
    }
  };
  
});
