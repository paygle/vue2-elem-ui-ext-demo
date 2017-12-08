/** img-constants */
define(function(require, exports, module) {
  'use strict';
  var IMG_CONSTANTS = {
    "E_YES_OR_NO": {
      "YES": { "c_code": "1", "c_cname": "是" },
      "NO": { "c_code": "0", "c_cname": "否" }
    }
  };

  module.exports = {
    CONSTANTS:IMG_CONSTANTS
  };
});