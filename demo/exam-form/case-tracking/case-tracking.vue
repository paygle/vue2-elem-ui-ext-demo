<template>
<div class="case-tracking" v-cloak>
  <h3 class="col-header">
    <span class="bottom"></span>
    <span class="line"></span>
    <span class="label-angle"></span>
    <span class="label">案件跟踪图</span>
  </h3>
  <el-button @click="loadingData"> 加载数据 </el-button>
  <el-popover trigger="hover" ref="caseInfoPopv" placement="left"> 
    <h3>案件信息</h3>
    <p>这里是案件信息</p>
  </el-popover>
  <el-popover trigger="hover" ref="caseTelPopv" placement="left"> 
    <h3>报案信息</h3>
    <p>这里是报案信息</p>
  </el-popover>
  <el-popover trigger="hover" ref="vehicalPopv" placement="left"> 
    <h3>出险车辆</h3>
    <p>这里是出险车辆</p>
  </el-popover>
  <el-popover trigger="hover" ref="relatePopv" placement="left"> 
    <h3>关联保单</h3>
    <p>这里是关联保单</p>
  </el-popover>
  <el-popover trigger="hover" ref="unActPopv" placement="left"> 
    <h3>未决信息</h3>
    <p>这里是未决信息</p>
  </el-popover>
  <el-popover trigger="hover" ref="overPopv" placement="left"> 
    <h3>结案信息</h3>
    <p>这里是结案信息</p>
  </el-popover>
 
 <el-popover 
    trigger="hover"
    ref="guidePopv"> 
    <div class="guider">
      <div class="state-icons">
        <h3>状态图标</h3>
        <p><i class="el-icon-check"></i> 已处理则显示这个图标</p>
        <p><i class="el-icon-check"></i> 待接收则显示这个图标</p>
        <p><i class="el-icon-check"></i> 暂存和已接收则显示这个图标</p>
        <p><i class="el-icon-check"></i> 已退回则显示这个图标</p>
        <p><i class="el-icon-check"></i> 一级任务节点如果存在二级流程，则显示此图标</p>
      </div>
      <div class="main-state">
        <table>
          <thead>
            <tr>
              <th>未激活</th>
              <th>激活</th>
              <th>意义</th>
            </tr>
          </thead>
          <tbody class="state-buttons">
            <tr>
              <td><span class="color-a">主流程节点名</span></td>
              <td><span class="color-a-x">主流程节点名</span></td>
              <td>已处理</td>
            </tr>
            <tr>
              <td><span class="color-b">主流程节点名</span></td>
              <td><span class="color-b-x">主流程节点名</span></td>
              <td>处理中</td>
            </tr>
            <tr>
              <td><span class="color-c">主流程节点名</span></td>
              <td><span class="color-c-x">主流程节点名</span></td>
              <td>未接收</td>
            </tr>
            <tr>
              <td><span class="color-d">主流程节点名</span></td>
              <td><span class="color-d-x">主流程节点名</span></td>
              <td>已终止</td>
            </tr>
            <tr>
              <td><span class="color-e">主流程节点名</span></td>
              <td><span class="color-e-x">主流程节点名</span></td>
              <td>未触发</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </el-popover>
  <case-track 
    :get-componet-name="getComponetName"
    :get-componet-data="getComponetData"
    :map-data="mapData" 
    @item-click="itemClick" 
    @icon-click="iconClick"
    :components="templComponents">
    <div slot="caseLeft">
      <span class="el-icon-information" v-popover:guidePopv></span>
      <div class="guide-describe">
        报案号：112321312
        当前可处理待办任务：10件
        其中，您有可处理待办任务2件，含：紧急任务0件、超时任务1件
      </div>
    </div>
    <ul slot="rightFixedPanel" class="right-fx-Panel">
      <li class="caseInfo" v-popover:caseInfoPopv>案件信息</li>
      <li class="caseTel"  v-popover:caseTelPopv>报案信息</li>
      <li class="caseVehical"  v-popover:vehicalPopv>出险车辆</li>
      <li class="caserelate"  v-popover:relatePopv>关联保单</li>
      <li class="caseUnact"  v-popover:unActPopv>未决信息</li>
      <li class="caseOver"  v-popover:overPopv>结案信息</li>
    </ul>
  </case-track>
</div>
</template>
<script>
// 案件跟踪组件
import ElButton from 'components/button'
import CaseTrack from 'components/case-track'
import ElPopover from 'components/popover';
import Templ from './templ'

export default {
  name: 'CaseTracking',
  components:{
    ElButton,
    CaseTrack,
    ElPopover
  },
  data(){
    // 结点状态:  已处理 complete  处理中 processing  未接收 unreceived  已终止 terminated  未触发 untriggered
    return{
      templComponents:{
        Templ
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
    loadingData(){
       this.mapData  = this.caseMapData
      //  this.caseMapData = this.mapData
    },
    // 节点点击事件
    itemClick(data){
      console.log('Item click:', data)
    },
    // 节点图标点击事件
    iconClick(data){
      console.log('icon click:', data)
    },

    // 返回组件名称
    getComponetName(args){
      console.log('getComponetName', args)
      if(Math.random()> 0.5){
        return "Templ"
      }
      return ""
    },
    // 返回组件数据
    getComponetData(args){
      console.log('getComponetData', args)
      let yy = [{cop:'AA', dat: 'BB'}, {cop:'xx', dat: 'yy'}]
      if(Math.random()> 0.5){
        return yy[0]
      }
      return yy[1]
    }
  },

  mounted(){
    console.log("重新加载中...");
  }
}
</script>
