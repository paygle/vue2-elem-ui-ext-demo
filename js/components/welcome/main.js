/** Welcome component */
define([
  "vue",
  "text!components/welcome/main.tpl"
], function(Vue, tpl){

return Vue.component('Welcome', {
  template: tpl,
});

}); // End Welcome Define
