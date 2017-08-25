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