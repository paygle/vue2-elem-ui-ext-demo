/** imgcompare service */
define([
  'uploader/doc-upload/components/imgcompare/src/directive',
  'uploader/doc-upload/components/imgcompare/src/index',
], function(
  directive,
  service
){
  'use strict';

  return {
    install:function(Vue) { Vue.use(directive); },
    directive: directive,
    service: service
  };
});