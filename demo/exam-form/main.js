/** home 入口模块JS处理 */
define([
  'vue',
  'ELEMENT',
  "vuex",
  "vueRouter",
  "dictStore"
], function(Vue, ELEMENT, Vuex, VueRouter, dictStore) {
  'use strict';
Vue.use(ELEMENT); //使用框架组件
Vue.use(Vuex);
Vue.use(VueRouter);

/********  数据管理  ********/

var store = new Vuex.Store({
    modules: {
      dictStore,
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
    // {
    //   path: '/',
    //   redirect:'/el-form'
    // },
    // {
    //   path: '/el-form',
    //   name: 'common-pay',
    //   component: ElFormExam,
    //   children: []
    // },
    // {
    //   path: '/form-table',
    //   component: FormTableExam,
    //   children: []
    // },
    // {
    //   path: '/water-fall',
    //   component: WaterfallView,
    //   children: []
    // },
    // {
    //   path: '/case-tracking',
    //   name: 'case-tracking',
    //   component: CaseTracking,
    //   children: []
    // },
    // {
    //   path: '/edit-form-exam',
    //   component: EditFormExam,
    //   children: [{
    //     path: '/query-form',
    //     name: 'query-form',
    //     component: QueryForm
    //   },{
    //     path: '/add-row',
    //     name: 'add-row',
    //     component: AddRow
    //   },{
    //     path: '/edit-row',
    //     name: 'edit-row',
    //     component: EditRow
    //   }]
    // }
  ]
});
 

new Vue({
  el: '#main-body',
  store: store,
  router: router
});
 
});
