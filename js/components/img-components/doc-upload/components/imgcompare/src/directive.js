/** imgcompare directive */
define([
  "vue",
  'utils/dom',
  'uploader/doc-upload/components/imgcompare/src/imgcompare-main/main'
], function(
  Vue,
  dom,
  Mask
){
  'use strict'
var addClass = dom.addClass;
var removeClass = dom.removeClass;
var getStyle = dom.getStyle;

return function install(Vue) {
  if (Vue.prototype.$isServer) return;
  var toggleLoading = function(el, binding) {
    if (binding.value) {
      Vue.nextTick(function() {
        if (binding.modifiers.fullscreen || true) {
          el.originalPosition = document.body.style.position;
          el.originalOverflow = document.body.style.overflow;

          addClass(el.mask, 'is-fullscreen');
          insertDom(document.body, el, binding);
        } else {
          removeClass(el.mask, 'is-fullscreen');

          if (binding.modifiers.body) {
            el.originalPosition = document.body.style.position;

            ['top', 'left'].forEach(function(property) {
              var scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
              el.maskStyle[property] = el.getBoundingClientRect()[property] + document.body[scroll] + document.documentElement[scroll] + 'px';
            });
            ['height', 'width'].forEach(function(property) {
              el.maskStyle[property] = el.getBoundingClientRect()[property] + 'px';
            });

            insertDom(document.body, el, binding);
          } else {
            el.originalPosition = el.style.position;
            insertDom(el, el, binding);
          }
        }
      });
    } else {
      if (el.domVisible) {
        el.instance.$on('after-leave', function() {
          el.domVisible = false;
          if (binding.modifiers.fullscreen && el.originalOverflow !== 'hidden') {
            document.body.style.overflow = el.originalOverflow;
          }
          if (binding.modifiers.fullscreen || binding.modifiers.body) {
            document.body.style.position = el.originalPosition;
          } else {
            el.style.position = el.originalPosition;
          }
        });
        el.instance.visible = false;
      }
    }
  };
  var insertDom = function(parent, el, binding) {
    if (!el.domVisible && getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility') !== 'hidden') {
      Object.keys(el.maskStyle).forEach(function(property) {
        el.mask.style[property] = el.maskStyle[property];
      });

      if (el.originalPosition !== 'absolute') {
        parent.style.position = 'relative';
      }
      if (binding.modifiers.fullscreen && binding.modifiers.lock) {
        parent.style.overflow = 'hidden';
      }
      el.domVisible = true;

      parent.appendChild(el.mask);
      Vue.nextTick(function() {
        el.instance.visible = true;
      });
      el.domInserted = true;
    }
  };

  Vue.directive('imgcompare', {
    bind: function(el, binding) {
      var mask = new Mask({
        el: document.createElement('div'),
        data: {
          fullscreen: true //全屏fullscreen
        }
      });
      el.instance = mask;
      el.mask = mask.$el;
      el.maskStyle = {};

      toggleLoading(el, binding);
    },

    update: function(el, binding, vnode) {
      el.instance.setText(el.getAttribute('element-loading-text'));
      if (binding.oldValue !== binding.value) {
        el.instance && (el.instance.visible = binding.value);
        toggleLoading(el, binding);
      }
    },

    unbind: function(el, binding) {
      if (el.domInserted) {
        if (binding.modifiers.fullscreen || binding.modifiers.body) {
          document.body.removeChild(el.mask);
        } else {
          el.mask &&
          el.mask.parentNode &&
          el.mask.parentNode.removeChild(el.mask);
        }
      }
      el.instance.$off('after-leave'); //移除after-leave监听，避免内存泄漏
    }
  });
};

}); //End imgcompare directive