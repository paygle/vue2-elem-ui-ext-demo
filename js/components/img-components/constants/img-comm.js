/** img-comm */
define(function(require, exports, module) {
  'use strict';
  module.exports = {
    computed:{
      kindNoParams: function(){
        return { //不需要开头字母，承保跟理赔共用一套险类
          c_sys_code : this.args.c_sys_code.substring(1)
        };
      }
    }
  };
});