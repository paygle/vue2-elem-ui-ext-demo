// 案件跟踪组件
define([
  'vue',
  'text!demo/exam-form/case-tracking/case-track/main.tpl',
  'demo/exam-form/case-tracking/templ/main'
], function(Vue, tpl, Templ) {
  'use strict';

  console.log('CaseTracking load!');

return Vue.component('case-tracking', {
    template: tpl,
    data: function(){
      // 结点状态:  已处理 complete  处理中 processing  未接收 unreceived  已终止 terminated  未触发 untriggered
      return{
        templComponents:{
          Templ:Templ
        },
        mapData: [
          {
            args: {name:"我的参数"},
            shapeIcon: 'el-icon-fixed-pos',
            nextLevel: 1,
            title: '报案',
            placement: 'left',
            status: 'unreceived'
          },{
            lanes: [
              {
                args: {name:"我的参数"},
                title: '单证收集',
                label: '标的车车损 粤K00001',
                nextLevel: 1,
                placement: 'top',
                status: 'processing',
                nodes: [
                  {
                    args: {name:"我的参数"},
                    title: '定损派工',
                    nextLevel: 1,
                    status: 'processing'
                  },
                  {
                    args: {name:"我的参数"},
                    title: '车辆定损',
                    status: 'complete'
                  }
                ]
              }
              // ,{
              //   args: {name:"我的参数"},
              //   title: '单证收集',
              //   label: '标的车车损 粤K00001',
              //   status: 'untriggered',
              //   nodes: [
              //     {
              //       args: {name:"我的参数"},
              //       title: '定损派工',
              //       status: 'complete'
              //     },{
              //       args: {name:"我的参数"},
              //       title: '车辆定损',
              //       status: 'complete'
              //     },{
              //       args: {name:"我的参数"},
              //       title: '车牌核价',
              //       status: 'complete'
              //     },{
              //       args: {name:"我的参数"},
              //       title: '车辆核损',
              //       status: 'complete'
              //     }
              //   ]
              // }
            ]
          },
          {
            args: {name:"我的参数"},
            title: '归档',
            status: 'complete'
          }
        ],
        caseMapData: [
          {
            args: {name:"我的参数"},
            shapeIcon: 'el-icon-fixed-pos',
            title: '报案',
            placement: 'left',
            status: 'unreceived'
          },
          {
            args: {name:"我的参数"},
            title: '现场查勘派工<br>现场查勘派工<br>现场查勘派工',
            nextLevel: 1,
            status: 'untriggered'
          },
          {
            args: {name:"我的参数"},
            title: '现场查勘',
            nextLevel: 0,
            placement: 'right',
            status: 'untriggered'
          },
          {
            lanes: [
              {
                args: {name:"我的参数"},
                title: '单证收集',
                label: '标的车车损 粤K00001',
                placement: 'left',
                status: 'processing',
                nodes: [
                  {
                    args: {name:"我的参数"},
                    title: '定损派工',
                    nextLevel: 1,
                    placement: 'right',
                    status: 'processing'
                  },
                  {
                    args: {name:"我的参数"},
                    title: '车辆定损',
                    nextLevel: 0,
                    placement: 'left',
                    status: 'complete'
                  }
                ]
              }
              ,{
                args: {name:"我的参数"},
                title: '单证收集',
                label: '标的车车损 粤K00001',
                status: 'untriggered',
                nodes: [
                  {
                    args: {name:"我的参数"},
                    title: '定损派工',
                    placement: 'top',
                    status: 'complete'
                  },{
                    args: {name:"我的参数"},
                    title: '车辆定损',
                    placement: 'bottom',
                    status: 'complete'
                  },{
                    args: {name:"我的参数"},
                    title: '车牌核价',
                    placement: 'right',
                    status: 'complete'
                  },{
                    args: {name:"我的参数"},
                    title: '车辆核损',
                    placement: 'top',
                    status: 'complete'
                  }
                ]
              }
              ,{
                args: {name:"我的参数"},
                title: '单证收集',
                label: '三者车上货物木材',
                placement: 'left',
                status: 'untriggered',
                nodes: [
                  {
                    args: {name:"我的参数"},
                    title: '定损派工',
                    status: 'terminated'
                  },{
                    args: {name:"我的参数"},
                    title: '财产定损',
                    status: 'terminated'
                  },{
                    args: {name:"我的参数"},
                    title: '财产核损',
                    placement: 'left',
                    status: 'terminated'
                  }
                ]
              },{
                args: {name:"我的参数"},
                title: '单证收集',
                label: '标的车上驾驶员 刘可可',
                placement: 'left',
                status: 'terminated',
                nodes: [
                  {
                    args: {name:"我的参数"},
                    title: '人伤调查派工',
                    status: 'terminated'
                  },{
                    args: {name:"我的参数"},
                    title: '人伤调查',
                    status: 'terminated'
                  },{
                    args: {name:"我的参数"},
                    title: '人伤跟踪',
                    status: 'terminated'
                  },{
                    args: {name:"我的参数"},
                    title: '人伤定损',
                    status: 'complete'
                  },{
                    args: {name:"我的参数"},
                    title: '人伤核损',
                    placement: 'top',
                    status: 'complete'
                  }
                ]
              },{
                args: {name:"我的参数"},
                title: '单证收集',
                label: '标的车上驾驶员 刘可可',
                placement: 'left',
                status: 'complete',
                nodes: [
                  {
                    args: {name:"我的参数"},
                    title: '人伤调查派工',
                    placement: 'top',
                    status: 'complete'
                  }
                ]
              }
              ,{
                args: {name:"我的参数"},
                title: '单证收集',
                label: '标的车上驾驶员 刘可可',
                placement: 'right',
                status: 'complete',
                nodes: [
                  {
                    args: {name:"我的参数"},
                    title: '人伤调查派工',
                    placement: 'left',
                    status: 'complete'
                  }
                ]
              },{
                args: {name:"我的参数"},
                title: '单证收集',
                label: '标的车上驾驶员 刘可可',
                placement: 'bottom',
                status: 'complete',
                nodes: [
                  {
                    args: {name:"我的参数"},
                    title: '人伤调查派工',
                    placement: 'right',
                    status: 'complete'
                  }
                ]
              },{
                args: {name:"我的参数"},
                title: '单证收集',
                label: '标的车上驾驶员 刘可可',
                placement: 'left',
                status: 'complete',
                nodes: [
                  {
                    args: {name:"我的参数"},
                    title: '人伤调查派工',
                    placement: 'bottom',
                    status: 'complete'
                  }
                ]
              }
            
            ]
          }
          ,{
            args: {name:"我的参数"},
            title: '理算',
            placement: 'top',
            status: 'complete'
          }
          ,{
            args: {name:"我的参数"},
            title: '核赔',
            placement: 'right',
            status: 'complete'
          }
          , {
            args: {name:"我的参数"},
            title: '结案',
            placement: 'left',
            status: 'complete'
          },
          {
            args: {name:"我的参数"},
            title: '归档',
            placement: 'left-start',
            status: 'complete'
          }
        ]
      }
    },
    methods:{
      loadingData: function(){
        this.mapData  = this.caseMapData
        //  this.caseMapData = this.mapData
      },
      // 节点点击事件
      itemClick: function(data){
        console.log('Item click:', data)
      },
      // 节点图标点击事件
      iconClick: function(data){
        console.log('icon click:', data)
      },

      // 返回组件名称
      getComponetName: function(args){
        console.log('getComponetName', args)
        if(Math.random()> 0.5){
          return "Templ"
        }
        return ""
      },
      // 返回组件数据
      getComponetData: function(args){
        console.log('getComponetData', args)
        var yy = [{cop:'AA', dat: 'BB'}, {cop:'xx', dat: 'yy'}]
        if(Math.random()> 0.5){
          return yy[0]
        }
        return yy[1]
      }
    },

    mounted: function(){
      console.log("重新加载中...");
    }
  });

});
