/** Welcome component */
define([
  "vue",
  "text!components/welcome/main.tpl"
], function(Vue, tpl){

Vue.component('Welcome', {
  template: tpl,
});

}); // End Welcome Define
