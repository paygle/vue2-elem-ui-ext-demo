/** home 入口模块JS处理 */
define([
  'jquery',
  'vue',
  'ELEMENT',
  "vuex",
  "vueRouter",
  "promise",
  "dictStore",
  'demo/color-form/form-exam/main',
  'demo/color-form/form-table/main',
  'demo/color-form/table-exam/main'
], function(
  jQuery,
  Vue,
  ELEMENT,
  Vuex,
  VueRouter,
  Promise,
  dictStore,
  FormExam,
  FormTableExam,
  TableExam
) {
  'use strict';
window.$ = window.jQuery = jQuery;
window.Vue = Vue;           // 作为全局使用
window.ELEMENT = ELEMENT;   // 作为全局使用
window.Promise = Promise;      // 这个必须想入否则无法在IE浏览器里面使用 vuex
Vue.use(ELEMENT); //使用框架组件
Vue.use(Vuex);
Vue.use(VueRouter);

console.log('Exam-Form load!  使用 debugger 断点容易导致加载错误或失败，请改用 console.log。');

/********  数据管理  ********/
var store = new Vuex.Store({
    modules: {
      dictStore: dictStore,
      editForm:{
        state:{
          tableData: [                    // store 数据共享
            {
              date: '2016-05-03',
              name: 'aaa',
              numtest : 18,
              address: '11-1101-110101',
              addressDetail: '上海市普陀区',
              schecked: '空空的',
              switch: 0,
              choose: '1'
            },
            {
              date: '2016-05-03',
              name: 'bbb',
              numtest : 54,
              address: '11-1101-110101',
              addressDetail: '上海市',
              schecked: '空空的',
              switch: 0,
              choose: '1'
            }
          ],
          currentRow: {}
        }
      }
    }
});

/********  路由配置管理  ********/
var router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect:'/form'
    },
    {
      path: '/form',
      name: 'form',
      component: FormExam,
      children: []
    },
    {
      path: '/table',
      component: TableExam,
      children: []
    },
    {
      path: '/form-table',
      component: FormTableExam,
      children: []
    }
  ]
});
 

new Vue({
  el: '#main-body',
  store: store,
  router: router
});
 
});
