/** home 入口模块JS处理 */
define([
  'jquery',
  'jquery.ztree',
  'vue',
  'ELEMENT',
  "vuex",
  "vueRouter",
  "promise",
  "dictStore",
  'demo/exam-form/case-tracking/case-tracking/main',
  'demo/exam-form/edit-form-exam/index',
  'demo/exam-form/edit-form-exam/add-row/main',
  'demo/exam-form/edit-form-exam/edit-row/main',
  'demo/exam-form/edit-form-exam/query-form/main',
  'demo/exam-form/el-form-exam/index',
  'demo/exam-form/form-table-exam/index',
  'demo/exam-form/waterfall-view/index',
  'uploader/doc-upload/main'
], function(
  jQuery,
  ztree,
  Vue, 
  ELEMENT,
  Vuex,
  VueRouter,
  Promise,
  dictStore,
  CaseTracking,
  EditFormExam,
  AddRow,
  EditRow,
  QueryForm,
  ElFormExam,
  FormTableExam,
  WaterfallView,
  DocUpload
) {
  'use strict';
  console.log('Exam-Form start! ', Vue);
window.Vue = Vue;           // 作为全局使用
window.$ = window.jQuery = jQuery;
window.ELEMENT = ELEMENT;   // 作为全局使用
window.Promise = Promise;      // 这个必须想入否则无法在IE浏览器里面使用 vuex
Vue.use(ELEMENT); //使用框架组件
Vue.use(Vuex);
Vue.use(VueRouter);
console.log('Exam-Form load!  使用 debugger 断点容易导致加载错误或失败，请改用 console.log。');
console.log('Exam-Form load! ', Vue);
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
      redirect:'/el-form'
    },
    {
      path: '/el-form',
      name: 'el-form',
      component: ElFormExam,
      children: []
    },
    {
      path: '/form-table',
      component: FormTableExam,
      children: []
    },
    {
      path: '/water-fall',
      component: WaterfallView,
      children: []
    },
    {
      path: '/case-tracking',
      name: 'case-tracking',
      component: CaseTracking,
      children: []
    },
    {
      path: '/edit-form-exam',
      component: EditFormExam,
      children: [{
        path: '/query-form',
        name: 'query-form',
        component: QueryForm
      },{
        path: '/add-row',
        name: 'add-row',
        component: AddRow
      },{
        path: '/edit-row',
        name: 'edit-row',
        component: EditRow
      }]
    }
  ]
});
 

new Vue({
  el: '#main-body',
  store: store,
  router: router,
  mounted:function() {

  }
});
 
});
