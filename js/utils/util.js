/** util in utils */
define(function(require, exports, module) {
  'use strict';
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  module.exports = {
    
    hasOwn: function(obj, key) {
      return hasOwnProperty.call(obj, key);
    },
    
    extend: function(to, _from) {
      for (let key in _from) {
        to[key] = _from[key];
      }
      return to;
    },
    
    toObject: function(arr) {
      var res = {};
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
          extend(res, arr[i]);
        }
      }
      return res;
    },
    
    getValueByPath: function(object, prop) {
      prop = prop || '';
      var paths = prop.split('.');
      let current = object;
      let result = null;
      for (let i = 0, j = paths.length; i < j; i++) {
        var path = paths[i];
        if (!current) break;
    
        if (i === j - 1) {
          result = current[path];
          break;
        }
        current = current[path];
      }
      return result;
    }
  };
 
});
