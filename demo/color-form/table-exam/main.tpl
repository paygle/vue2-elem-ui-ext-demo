<div class="table-exam" v-cloak>
  <h3 class="col-header">
    <span class="bottom"></span>
    <span class="line"></span>
    <span class="label-angle"></span>
    <span class="label">Table 表格着色</span>
  </h3>

  <el-table
    :data="tableData"
    style="width: 100%"
    :compare-styl="compareStyl"
    :modified-styl="modifiedStyl"
    @row-click="tableRowClick"
    ref="relTable"
    expand-icon-hidden
    expand-only-one border>
      <el-table-column type="expand">
        <template scope="data">

          <el-form
            :err-styl="errStyl"
            :compare-styl="compareStyl"
            :valid-trigger="validTrigger"
            :model="data.row"
            :rules="rules"
            ref="ruleForm" 
            label-width="100px" 
            class="demo-ruleForm">
            <div class="row">
              <div class="col-md-3">
                <el-form-item label="活动名称" prop="name">
                  <el-input v-model="data.row.name" :get-fill-styl="getFillStyl"></el-input>
                </el-form-item>
              </div>
              <div class="col-md-3">
                <el-form-item label="活动区域" prop="region">
                  <el-select 
                    :get-fill-styl="getFillStylSel"
                    v-model="data.row.region"
                    placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col-md-6">
                <el-form-item label="活动时间" required>
                <div clas="row">
                  <div class="col-md-6">
                    <el-form-item prop="date1">
                      <el-date-picker 
                        type="date" 
                        data-type="string" 
                        :get-fill-styl="getFillStylDat"
                        placeholder="选择日期" 
                        v-model="data.row.date1"
                        style="width: 100%;">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                  <div class="col-md-1">-</div>
                  <div class="col-md-5">  
                    <el-form-item prop="date2">
                      <el-time-picker type="fixed-time" placeholder="选择时间" v-model="data.row.date2" style="width: 100%;"></el-time-picker>
                    </el-form-item>
                  </div>
                </div>
                </el-form-item>
              </div>
              <div class="col-md-3">
                <el-form-item label="即时配送" prop="delivery">
                  <el-switch v-model="data.row.delivery"></el-switch>
                </el-form-item>
              </div>
              <div class="col-md-6">
                <el-form-item label="活动性质" prop="type">
                  <el-checkbox-group v-model="data.row.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
              <div class="col-md-6">
                <el-form-item label="特殊资源" prop="resource">
                  <el-radio-group v-model="data.row.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div class="col-md-10">
                <el-form-item label="活动形式" prop="desc">
                  <el-input type="textarea" v-model="data.row.desc"></el-input>
                </el-form-item>
              </div>
              <div class="col-md-3">
                <el-form-item label="地址选择" prop="address">
                  <address-box 
                    v-model="data.row.address"
                    params="123" 
                    :get-fill-styl="getFillStylAddr"
                    @address-change="addressChanged">
                  </address-box>
                </el-form-item>
              </div>
              <div class="col-md-3">
                <el-form-item label="活动绑定" prop="actbind">
                  <el-input v-model="data.row.actbind" :get-fill-styl="getFillStyl"></el-input>
                </el-form-item>
              </div>
              <div class="col-md-3">
                <el-form-item label="活动主题" prop="tips">
                  <el-input v-model="data.row.tips" :get-fill-styl="getFillStyl"></el-input>
                </el-form-item>
              </div>
              
              <div class="col-md-3">
                <el-form-item label="数值验证" prop="num">
                  <el-input-number v-model="data.row.num" :get-fill-styl="getFillStylNum"></el-input-number>
                </el-form-item>
              </div>
              <div class="col-md-3">
                <el-form-item label="比率验证" prop="pernum">
                  <rate-number 
                    v-model="data.row.pernum"
                    :get-fill-styl="getFillStylRate"
                    rate="percent">
                  </rate-number>
                </el-form-item>
              </div>
              <div class="col-md-3">
                <el-form-item label="格式化" prop="fnumber">
                  <format-number 
                    v-model="data.row.fnumber"
                    :get-fill-styl="getFillStylFNum"
                    is-empty autofocus>
                  </format-number>
                </el-form-item>
              </div>
              <div class="col-md-3">
                <el-form-item label="自动建议" prop="suggest">
                  <list-complete
                    ref="listCompleteA"
                    v-model="data.row.suggest"
                    pop-width="420px"
                    prop-name="address"
                    :fetch-suggestions="querySearchAsync"
                    :get-fill-styl="getFillStylSuggest"
                    placeholder="请输入内容，自动建议提示"
                    @select="handleSelect">
                      <template scope="props">
                        <el-table :data="props.data" @row-click="listRowClickA">
                          <el-table-column prop="value" label="数值"></el-table-column>
                          <el-table-column prop="address" label="地址"></el-table-column>
                        </el-table>
                      </template>
                  </list-complete>
                </el-form-item>
              </div>
              <div class="col-md-5">
                <el-form-item label="选择了我" prop="checklist">
                  <rich-checkbox-group v-model="data.row.checklist">
                    <rich-checkbox label="你选择了我" disabled></rich-checkbox>
                    <rich-checkbox label="啥都没有" icon="hammer"></rich-checkbox>
                    <rich-checkbox label="你选了我"></rich-checkbox>
                    <rich-checkbox label="啥没有"></rich-checkbox>
                  </rich-checkbox-group>
                </el-form-item>
              </div>
              
              <div class="col-md-5">
                <el-form-item label="组选项切换" prop="radioGVal">
                  <rich-radio-group v-model="data.row.radioGVal">
                    <rich-radio canceled icon="edit" label="43">组选项A</rich-radio>
                    <rich-radio canceled label="54" disabled>组选项B</rich-radio>
                    <rich-radio canceled label="72">组选项C</rich-radio>
                    <rich-radio canceled label="76">组选项C</rich-radio>
                  </rich-radio-group>
                </el-form-item>
              </div>
              <div class="col-md-2">
                <el-form-item label="我选择了" prop="acheck">
                  <rich-checkbox
                    v-model="data.row.acheck"
                    true-label="你选择了我"
                    false-label="啥都没有">选择框U</rich-checkbox>
                </el-form-item>
              </div>
              <div class="col-md-2">
                <el-form-item label="配送" prop="adel">
                  <custom-switch
                    v-model="data.row.adel"
                    :on-value="switchAttrs.onValue"
                    :off-value="switchAttrs.offValue"
                    :on-text="switchAttrs.onText"
                    :off-text="switchAttrs.offText">
                  </custom-switch>
                </el-form-item>
              </div>
            </div>
          </el-form>

        </template>
      </el-table-column>
      <el-table-column
        label="活动名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="活动区域"
        prop="region">
      </el-table-column>
      <el-table-column
        label="活动时间"
        prop="date1">
      </el-table-column>
      <el-table-column
        label="活动性质"
        prop="type">
      </el-table-column>
      <el-table-column
        label="特殊资源"
        prop="resource">
      </el-table-column>
      <el-table-column
        label="活动形式"
        prop="desc">
      </el-table-column>
      <el-table-column
        label="地址选择"
         width="150px"
        prop="address">
        <template scope="data">
          <address-box v-model="data.row.address" :translated="true"></address-box>
        </template>
      </el-table-column>
      <el-table-column
        label="活动主题"
        prop="tips">
      </el-table-column>
      <el-table-column
        label="数值验证"
        prop="num">
      </el-table-column>
      <el-table-column
        label="比率验证"
        prop="pernum">
      </el-table-column>
      <el-table-column
        label="格式化"
        prop="fnumber">
      </el-table-column>
      <el-table-column
        label="组选项切换"
        prop="radioGVal">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template scope="scope">
          <el-button type="text" @click="DeleteRow(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- valid-item 表格-->

    <h3 style="background:#5d9cec; color: #fff;padding: 5px 10px;"> ValidItem 表格</h3>
    <el-table
    :data="tableDatax"
    style="width: 100%"
    :compare-styl="compareStyl"
    :modified-styl="modifiedStyl"
    @row-click="tableRowClickx"
    ref="relTablex"
    expand-icon-hidden
    expand-only-one border>
      <el-table-column type="expand">
        <template scope="data">
          <valid-form
            :err-styl="errStyl"
            :compare-styl="compareStyl"
            :valid-trigger="validTriggerx"
            label-width="80px"
            :model="data.row"
            :rules="rules"
            ref="ruleForm"
            class="demo-validForm">
            <div class="row">
              <valid-item
                class="col-md-3"
                label="活动名称"
                :model="data.row"
                @validate="validateTest"
                prop="name">
                <el-input v-model="data.row.name" :get-fill-styl="getFillStyl" placeholder="单个输入验证"></el-input>
              </valid-item>

              <valid-item 
                  class="col-md-3" 
                  label="活动区域"
                  :model="data.row"
                  @validate="validateTest" 
                  prop="region">
                  <el-select 
                    :get-fill-styl="getFillStylSel"
                    v-model="data.row.region"
                    placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
              </valid-item>
              
              <valid-item 
                  class="col-md-3" 
                  label="选择日期"
                  :model="data.row"
                  @validate="validateTest"
                  prop="date1">
                  <el-date-picker 
                    type="date" 
                    data-type="string" 
                    :get-fill-styl="getFillStylDat"
                    placeholder="选择日期" 
                    v-model="data.row.date1"
                    style="width: 100%;">
                  </el-date-picker>
              </valid-item>
              
              <valid-item 
                  class="col-md-3" 
                  label="即时配送"
                  :model="data.row"
                  @validate="validateTest" 
                  prop="delivery">
                  <el-switch v-model="data.row.delivery"></el-switch>
              </valid-item>
              
              <valid-item 
                  class="col-md-6" 
                  label="活动性质"
                  :model="data.row"
                  @validate="validateTest" 
                  prop="type">
                  <el-checkbox-group v-model="data.row.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                  </el-checkbox-group>
              </valid-item>
              <valid-item 
                  class="col-md-6" 
                  label="特殊资源"
                  :model="data.row"
                  @validate="validateTest" 
                  prop="resource">
                  <el-radio-group v-model="data.row.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
              </valid-item>
              <valid-item 
                  class="col-md-10" 
                  label="活动形式"
                  :model="data.row"
                  @validate="validateTest" 
                  prop="desc">
                  <el-input type="textarea" v-model="data.row.desc"></el-input>
              </valid-item>
              <valid-item 
                  class="col-md-3" 
                  label="地址选择"
                  :model="data.row"
                  @validate="validateTest" 
                  prop="address">
                  <address-box 
                    v-model="data.row.address"
                    params="123" 
                    :get-fill-styl="getFillStylAddr"
                    @address-change="addressChanged">
                  </address-box>
              </valid-item>

              <valid-item 
                  class="col-md-3"
                  label="活动绑定"
                  :model="data.row"
                  @validate="validateTest" 
                  prop="actbind">
                  <el-input v-model="data.row.actbind" :get-fill-styl="getFillStyl"></el-input>
              </valid-item>
              <valid-item 
                  class="col-md-3" 
                  label="活动主题"
                  :model="data.row"
                  @validate="validateTest" 
                  prop="tips">
                  <el-input v-model="data.row.tips" :get-fill-styl="getFillStyl"></el-input>
              </valid-item>
              <valid-item 
                  class="col-md-3" 
                  label="数值验证"
                  :model="data.row"
                  @validate="validateTest" 
                  prop="num">
                  <el-input-number v-model="data.row.num" :get-fill-styl="getFillStylNum"></el-input-number>
              </valid-item>
              <valid-item 
                  class="col-md-3" 
                  label="比率验证"
                  :model="data.row"
                  @validate="validateTest" 
                  prop="pernum">
                  <rate-number 
                    v-model="data.row.pernum"
                    :get-fill-styl="getFillStylRate" 
                    rate="percent">
                  </rate-number>
              </valid-item>
              <valid-item 
                  class="col-md-3" 
                  label="格式化"
                  :model="data.row"
                  @validate="validateTest" 
                  prop="fnumber">
                  <format-number 
                    v-model="data.row.fnumber"
                    :get-fill-styl="getFillStylFNum" 
                    is-empty>
                  </format-number>
              </valid-item>
              <valid-item 
                  class="col-md-3" 
                  label="自动建议"
                  :model="data.row"
                  @validate="validateTest" 
                  prop="suggest">
                  <list-complete
                    ref="listCompleteB"
                    v-model="data.row.suggest"
                    pop-width="420px"
                    prop-name="address"
                    :get-fill-styl="getFillStylSuggest"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入内容，自动建议提示"
                    @select="handleSelect">
                      <template scope="props">
                        <el-table :data="props.data" @row-click="listRowClickB">
                          <el-table-column prop="value" label="数值"></el-table-column>
                          <el-table-column prop="address" label="地址"></el-table-column>
                        </el-table>
                      </template>
                  </list-complete>
              </valid-item>
              
              <valid-item 
                  class="col-md-5" 
                  label="选择了我"
                  :model="data.row"
                  @validate="validateTest" 
                  prop="checklist">
                  <rich-checkbox-group v-model="data.row.checklist">
                    <rich-checkbox label="你选择了我" disabled></rich-checkbox>
                    <rich-checkbox label="啥都没有" icon="hammer"></rich-checkbox>
                    <rich-checkbox label="你选了我"></rich-checkbox>
                    <rich-checkbox label="啥没有"></rich-checkbox>
                  </rich-checkbox-group>
              </valid-item>
              <valid-item 
                  class="col-md-5" 
                  label="组选项切换"
                  :model="data.row"
                  @validate="validateTest" 
                  prop="radioGVal"
                  label-width="80px">
                  <rich-radio-group v-model="data.row.radioGVal">
                    <rich-radio canceled icon="edit" label="43">组选项A</rich-radio>
                    <rich-radio canceled label="54" disabled>组选项B</rich-radio>
                    <rich-radio canceled label="72">组选项C</rich-radio>
                    <rich-radio canceled label="76">组选项C</rich-radio>
                  </rich-radio-group>
              </valid-item>
              <valid-item 
                  class="col-md-5" 
                  label="我选择了"
                  :model="data.row"
                  @validate="validateTest" 
                  prop="acheck">
                  <rich-checkbox
                    v-model="data.row.acheck"
                    true-label="你选择了我"
                    false-label="啥都没有">选择框U</rich-checkbox>
              </valid-item>
              <valid-item 
                  class="col-md-2" 
                  label="即时配送"
                  :model="data.row"
                  @validate="validateTest" 
                  prop="adel">
                  <custom-switch
                    v-model="data.row.adel"
                    :on-value="switchAttrs.onValue"
                    :off-value="switchAttrs.offValue"
                    :on-text="switchAttrs.onText"
                    :off-text="switchAttrs.offText">
                  </custom-switch>
              </valid-item>
            </div>
          </valid-form>
        </template>
      </el-table-column>
      <el-table-column
        label="活动名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="活动区域"
        prop="region">
      </el-table-column>
      <el-table-column
        label="活动时间"
        prop="date1">
      </el-table-column>
      <el-table-column
        label="活动性质"
        prop="type">
      </el-table-column>
      <el-table-column
        label="特殊资源"
        prop="resource">
      </el-table-column>
      <el-table-column
        label="活动形式"
        prop="desc">
      </el-table-column>
      <el-table-column
        label="地址选择"
         width="150px"
        prop="address">
        <template scope="data">
          <address-box v-model="data.row.address" :translated="true"></address-box>
        </template>
      </el-table-column>
      <el-table-column
        label="活动主题"
        prop="tips">
      </el-table-column>
      <el-table-column
        label="数值验证"
        prop="num">
      </el-table-column>
      <el-table-column
        label="比率验证"
        prop="pernum">
      </el-table-column>
      <el-table-column
        label="格式化"
        prop="fnumber">
      </el-table-column>
      <el-table-column
        label="组选项切换"
        prop="radioGVal">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template scope="scope">
          <el-button type="text" @click="DeleteRowx(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

</div>