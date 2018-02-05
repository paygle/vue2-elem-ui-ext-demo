/** Welcome component */
define([
  "vue",
  "text!components/iconlist/main.tpl"
], function(Vue, tpl){

return Vue.component('iconlist', {
  template: tpl,
});

}); // End Welcome Define