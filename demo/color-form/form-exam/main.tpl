<div class="form-exam" v-side-guide="sideGuideData" v-cloak>
  <h3 class="col-header">
    <span class="bottom"></span>
    <span class="line"></span>
    <span class="label-angle"></span>
    <span class="label">Form 表单着色</span>
  </h3>
  <el-form
    :err-styl="errStyl"
    :compare-styl="compareStyl"
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm">
    <div class="row">
      <div class="col-md-3">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name" :get-fill-styl="getFillStyl"></el-input>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="活动区域" prop="region">
          <el-select
            :get-fill-styl="getFillStylSel"
            v-model="ruleForm.region"
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
                v-model="ruleForm.date1" 
                style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="col-md-1">-</div>
          <div class="col-md-5">  
            <el-form-item prop="date2">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </div>
        </div>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
      </div>
      <div class="col-md-6">
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="col-md-6">
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="col-md-10" ref="refItem">
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="地址选择" prop="address">
          <address-box 
            v-model="ruleForm.address" 
            params="123" 
            :get-fill-styl="getFillStylAddr"
            @address-change="addressChanged">
          </address-box>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="活动绑定" prop="actbind">
          <el-input v-model="ruleForm.actbind" :get-fill-styl="getFillStyl"></el-input>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="活动主题" prop="tips">
          <el-input v-model="ruleForm.tips" :get-fill-styl="getFillStyl"></el-input>
        </el-form-item>
      </div>
      
      <div class="col-md-3">
        <el-form-item label="数值验证" prop="num">
          <el-input-number v-model="ruleForm.num" :get-fill-styl="getFillStylNum"></el-input-number>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="比率验证" prop="pernum">
          <rate-number 
            v-model="ruleForm.pernum"
            :get-fill-styl="getFillStylRate"
            rate="percent">
          </rate-number>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="格式化" prop="fnumber">
          <format-number 
            v-model="ruleForm.fnumber" 
            :get-fill-styl="getFillStylFNum"
            is-empty autofocus>
          </format-number>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="自动建议" prop="suggest">
          <list-complete
            ref="listCompleteA"
            v-model="ruleForm.suggest"
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
          <rich-checkbox-group v-model="ruleForm.checklist">
            <rich-checkbox label="你选择了我" disabled></rich-checkbox>
            <rich-checkbox label="啥都没有" icon="hammer"></rich-checkbox>
            <rich-checkbox label="你选了我"></rich-checkbox>
            <rich-checkbox label="啥没有"></rich-checkbox>
          </rich-checkbox-group>
        </el-form-item>
      </div>
      
      <div class="col-md-5">
        <el-form-item label="组选项切换" prop="radioGVal">
          <rich-radio-group v-model="ruleForm.radioGVal">
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
            v-model="ruleForm.acheck"
            true-label="你选择了我"
            false-label="啥都没有">选择框U</rich-checkbox>
        </el-form-item>
      </div>
      <div class="col-md-2">
        <el-form-item label="即时配送" prop="adel">
          <custom-switch
            v-model="ruleForm.adel"
            :on-value="switchAttrs.onValue"
            :off-value="switchAttrs.offValue"
            :on-text="switchAttrs.onText"
            :off-text="switchAttrs.offText">
          </custom-switch>
        </el-form-item>
      </div>
      
    </div>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>

  <!-- valid-fields-form -->
  <h3 style="margin: 10px; background:#789dcc;color:#fff; padding: 5px;"> valid-fields form 着色</h3>
  <div class="valid-fields-form" style="margin:10px;">
    <div class="row">
      
      <valid-field 
        class="col-md-3" 
        label="活动名称" 
        :err-styl="errStyl"
        :compare-styl="compareStyl"
        :model="itemForm" 
        @validate="validateTest" 
        prop="name" 
        :rules="rules" 
        label-width="60px">
        <el-input v-model="itemForm.name" :get-fill-styl="getFillStyl" placeholder="单个输入验证"></el-input>
      </valid-field>
      
      <valid-field 
          class="col-md-3" 
          label="活动区域" 
          :err-styl="errStyl"
          :compare-styl="compareStyl"
          :model="itemForm" 
          @validate="validateTest" 
          prop="region" 
          :rules="rules" 
          label-width="60px">
          <el-select 
            :get-fill-styl="getFillStylSel"
            v-model="itemForm.region" 
            placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
      </valid-field>
      
      <valid-field 
          class="col-md-3" 
          label="选择日期" 
          :err-styl="errStyl"
          :compare-styl="compareStyl"
          :model="itemForm"  
          @validate="validateTest" 
          prop="date1" 
          :rules="rules" 
          label-width="60px">
          <el-date-picker 
            type="date" 
            data-type="string" 
            :get-fill-styl="getFillStylDat"
            placeholder="选择日期" 
            v-model="itemForm.date1" 
            style="width: 100%;">
          </el-date-picker>
      </valid-field>
      
      <valid-field 
          class="col-md-3" 
          label="即时配送" 
          :err-styl="errStyl"
          :compare-styl="compareStyl"
          :model="itemForm" 
          @validate="validateTest" 
          prop="delivery" 
          :rules="rules" 
          label-width="60px">
          <el-switch v-model="itemForm.delivery"></el-switch>
      </valid-field>
      
      <valid-field 
          class="col-md-6" 
          label="活动性质" 
          :err-styl="errStyl"
          :compare-styl="compareStyl"
          :model="itemForm"  
          @validate="validateTest" 
          prop="type" 
          :rules="rules" 
          label-width="60px">
          <el-checkbox-group v-model="itemForm.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
      </valid-field>
      <valid-field 
          class="col-md-6" 
          label="特殊资源" 
          :err-styl="errStyl"
          :compare-styl="compareStyl"
          :model="itemForm" 
          @validate="validateTest" 
          prop="resource" 
          :rules="rules" 
          label-width="60px">
          <el-radio-group v-model="itemForm.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
      </valid-field>
      <valid-field 
          class="col-md-10" 
          label="活动形式" 
          :err-styl="errStyl"
          :compare-styl="compareStyl"
          :model="itemForm" 
          @validate="validateTest" 
          prop="desc" 
          :rules="rules" 
          label-width="60px">
          <el-input type="textarea" v-model="itemForm.desc"></el-input>
      </valid-field>
      <valid-field 
          class="col-md-3" 
          label="地址选择" 
          :err-styl="errStyl"
          :compare-styl="compareStyl"
          :model="itemForm" 
          @validate="validateTest" 
          prop="address" 
          :rules="rules" 
          label-width="60px">
          <address-box 
            v-model="itemForm.address" 
            params="123" 
            :get-fill-styl="getFillStylAddr"
            @address-change="addressChanged">
          </address-box>
      </valid-field>
      
      <valid-field 
          class="col-md-3" 
          label="活动绑定" 
          :err-styl="errStyl"
          :compare-styl="compareStyl"
          :model="itemForm" 
          @validate="validateTest" 
          prop="actbind" 
          :rules="rules" 
          label-width="60px">
          <el-input v-model="itemForm.actbind" :get-fill-styl="getFillStyl"></el-input>
      </valid-field>
      <valid-field 
          class="col-md-3" 
          label="活动主题" 
          :err-styl="errStyl"
          :compare-styl="compareStyl"
          :model="itemForm"
          @validate="validateTest" 
          prop="tips" 
          :rules="rules" 
          label-width="60px">
          <el-input v-model="itemForm.tips" :get-fill-styl="getFillStyl"></el-input>
      </valid-field>
      <valid-field 
          class="col-md-3" 
          label="数值验证" 
          :err-styl="errStyl"
          :compare-styl="compareStyl"
          :model="itemForm"
          @validate="validateTest" 
          prop="num" 
          :rules="rules" 
          label-width="60px">
          <el-input-number v-model="itemForm.num" :get-fill-styl="getFillStylNum"></el-input-number>
      </valid-field>
      <valid-field
          ref="focusItem"
          class="col-md-3"
          label="比率验证" 
          :err-styl="errStyl"
          :compare-styl="compareStyl"
          :model="itemForm"
          @validate="validateTest" 
          prop="pernum" 
          :rules="rules" 
          label-width="60px">
          <rate-number 
            v-model="itemForm.pernum"
            :get-fill-styl="getFillStylRate" 
            rate="percent">
          </rate-number>
      </valid-field>
      <valid-field
          class="col-md-3"
          label="格式化" 
          :err-styl="errStyl"
          :compare-styl="compareStyl"
          :model="itemForm"
          @validate="validateTest" 
          prop="fnumber" 
          :rules="rules" 
          label-width="60px">
          <format-number 
            v-model="itemForm.fnumber"
            :get-fill-styl="getFillStylFNum" 
            is-empty>
          </format-number>
      </valid-field>
      <valid-field 
          class="col-md-3" 
          label="自动建议" 
          :err-styl="errStyl"
          :compare-styl="compareStyl"
          :model="itemForm" 
          @validate="validateTest" 
          prop="suggest" 
          :rules="rules" 
          label-width="60px">
          <list-complete
            ref="listCompleteB"
            v-model="itemForm.suggest"
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
      </valid-field>
      
      <valid-field
          class="col-md-5" 
          label="选择了我" 
          :err-styl="errStyl"
          :compare-styl="compareStyl"
          :model="itemForm"
          @validate="validateTest" 
          prop="checklist"
          :rules="rules" 
          label-width="60px">
          <rich-checkbox-group v-model="itemForm.checklist">
            <rich-checkbox label="你选择了我" disabled></rich-checkbox>
            <rich-checkbox label="啥都没有" icon="hammer"></rich-checkbox>
            <rich-checkbox label="你选了我"></rich-checkbox>
            <rich-checkbox label="啥没有"></rich-checkbox>
          </rich-checkbox-group>
      </valid-field>
      <valid-field 
          class="col-md-5" 
          label="组选项切换" 
          :err-styl="errStyl"
          :compare-styl="compareStyl"
          :model="itemForm"
          @validate="validateTest" 
          prop="radioGVal" 
          :rules="rules" 
          label-width="80px">
          <rich-radio-group v-model="itemForm.radioGVal">
            <rich-radio canceled icon="edit" label="43">组选项A</rich-radio>
            <rich-radio canceled label="54" disabled>组选项B</rich-radio>
            <rich-radio canceled label="72">组选项C</rich-radio>
            <rich-radio canceled label="76">组选项C</rich-radio>
          </rich-radio-group>
      </valid-field>
      <valid-field 
          class="col-md-5" 
          label="我选择了" 
          :err-styl="errStyl"
          :compare-styl="compareStyl"
          :model="itemForm"
          @validate="validateTest" 
          prop="acheck" 
          :rules="rules" 
          label-width="60px">
          <rich-checkbox
            v-model="itemForm.acheck"
            true-label="你选择了我"
            false-label="啥都没有">选择框U</rich-checkbox>
      </valid-field>
      <valid-field 
          class="col-md-2" 
          label="即时配送" 
          :err-styl="errStyl"
          :compare-styl="compareStyl"
          :model="itemForm" 
          @validate="validateTest" 
          prop="adel" 
          :rules="rules" 
          label-width="60px">
          <custom-switch
            v-model="itemForm.adel"
            :on-value="switchAttrs.onValue"
            :off-value="switchAttrs.offValue"
            :on-text="switchAttrs.onText"
            :off-text="switchAttrs.offText">
          </custom-switch>
      </valid-field>
     </div>
    <el-button @click="submitValidItems">验证</el-button>
    <el-button @click="resetValidItems">重置</el-button>
  </div>
</div>