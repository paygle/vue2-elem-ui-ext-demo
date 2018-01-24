<div class="form-table-exam row" style="width: 100%; margin: 0 auto" v-cloak>
  <guide-steps :active="2" line-styl="dotline"  :current-step="currentStep" finish-status="success">
      <guide-step title="步骤 1"></guide-step>
      <guide-step title="步骤 2"></guide-step>
      <guide-step title="步骤 3"></guide-step>
      <guide-step title="步骤 4"></guide-step>
      <guide-step title="步骤 5"></guide-step>
    </guide-steps>
    <icollapse>
      <icollapse-item title="步骤条实例">
        <div class="col-md-12">
          <guide-steps :active="2" center line-styl="dotline"  :current-step="currentStep" finish-status="success">
            <guide-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></guide-step>
            <guide-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></guide-step>
            <guide-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></guide-step>
            <guide-step title="步骤 4" description="这是一段很长很长很长的描述性文字"></guide-step>
            <guide-step title="步骤 5" description="这是一段很长很长很长的描述性文字"></guide-step>
          </guide-steps>

          <guide-steps :active="2" center line-styl="dotline" direction="vertical" :current-step="currentStep" finish-status="success">
            <guide-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></guide-step>
            <guide-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></guide-step>
            <guide-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></guide-step>
          </guide-steps>

          <guide-steps :active="2" center :current-step="currentStep">
            <guide-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></guide-step>
            <guide-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></guide-step>
            <guide-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></guide-step>
          </guide-steps>

          <guide-steps :active="2" :current-step="currentStep" @node-click="nodeClick" finish-status="success">
            <guide-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></guide-step>
            <guide-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></guide-step>
            <guide-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></guide-step>
            <guide-step title="步骤 4" description="这是一段很长很长很长的描述性文字"></guide-step>
            <guide-step title="步骤 5" description="这是一段很长很长很长的描述性文字"></guide-step>
            <guide-step title="步骤 6" description="这是一段很长很长很长的描述性文字"></guide-step>
          </guide-steps>

          <guide-steps :active="2" center direction="vertical" :current-step="currentStep" finish-status="success">
            <guide-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></guide-step>
            <guide-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></guide-step>
            <guide-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></guide-step>
          </guide-steps>
        </div>
      </icollapse-item>
    </icollapse>

    <h3 class="col-header">
      <span class="bottom"></span>
      <span class="line"></span>
      <span class="label-angle"></span>
      <span class="label">Form-Table 表单</span>
    </h3>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <div class="row">
        <div class="col-md-3">
          <el-form-item label="切换模式" prop="delivery">
            <custom-switch
              v-model="ruleForm.mdl"
              :on-value="true"
              :off-value="false"
              :on-text="switchAttrs.onText"
              :off-text="switchAttrs.offText">
            </custom-switch>
          </el-form-item>
        </div>
        <div class="col-md-3">
          <el-form-item label="开始时间" prop="start">
            <el-date-picker
              type="datetime"
              data-type="string"
              placeholder="选择日期"
              v-model="ruleForm.start"
              lock-time="3:0:0"
              :disabled-time="ruleForm.mdl"
              style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="col-md-3">
          <el-form-item label="结束时间" prop="end">
            <el-date-picker
              type="datetimerange"
              date-type="string"
              placeholder="选择日期"
              v-model="ruleForm.end"
              lock-time="-"
              :disabled-time="ruleForm.mdl"
              style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </div>
        <div class="col-md-3">
          <el-form-item label="活动区域" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域" filterable > 
              <el-option 
                v-for="item in options"
                :key="item.value" 
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="col-md-3">
          <el-form-item label="格式化" prop="fnumber">
            <format-number v-model="ruleForm.fnumber" is-empty></format-number>
          </el-form-item>
        </div>
        <div class="col-md-3">
          <el-form-item label="比率" prop="rate">
            <rate-number rate="permillage" v-model.number="ruleForm.rate" is-empty></rate-number>
          </el-form-item>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 inline both-align">
          <el-form-item label="活动时间" >
            <div class="width-p45">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="width-p10 center">-</div>
            <div class="width-p45">
              <el-form-item prop="date2">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </div>
          </el-form-item>
        </div>
        <div class="col-md-6 inline both-align">
          <el-form-item label="活动时间">
            <div class="width-p45">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="width-p10 center">-</div>
            <div class="width-p45">
              <el-form-item prop="date2">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </div>
          </el-form-item>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <el-form-item label="即时配送" prop="delivery">
            <custom-switch
              disabled
              v-model="ruleForm.delivery"
              :on-value="switchAttrs.onValue"
              :off-value="switchAttrs.offValue"
              :on-text="switchAttrs.onText"
              :off-text="switchAttrs.offText">
            </custom-switch>
          </el-form-item>
        </div>
        <div class="col-md-3">
          <el-form-item label="即时配送" prop="delivery">
            <custom-switch
              v-model="ruleForm.delivery"
              :on-value="switchAttrs.onValue"
              :off-value="switchAttrs.offValue"
              :on-text="switchAttrs.onText"
              :off-text="switchAttrs.offText">
            </custom-switch>
          </el-form-item>
        </div>
        <div class="col-md-3">
          <el-form-item label="即时配送" prop="delivery">
            <custom-switch
              v-model="ruleForm.delivery"
              :on-value="switchAttrs.onValue"
              :off-value="switchAttrs.offValue"
              :on-text="switchAttrs.onText"
              :off-text="switchAttrs.offText">
            </custom-switch>
          </el-form-item>
        </div>
        <div class="col-md-3">
          <el-form-item label="即时配送" prop="delivery">
            <custom-switch
              v-model="ruleForm.delivery"
              :on-value="switchAttrs.onValue"
              :off-value="switchAttrs.offValue"
              :on-text="switchAttrs.onText"
              :off-text="switchAttrs.offText">
            </custom-switch>
          </el-form-item>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Checkbox组选择" prop="checklist">
            <rich-checkbox-group v-model="ruleForm.checklist">
              <rich-checkbox label="你选择了我" disabled></rich-checkbox>
              <rich-checkbox label="啥都没有" icon="hammer"></rich-checkbox>
              <rich-checkbox label="你选了我"></rich-checkbox>
              <rich-checkbox label="啥没有"></rich-checkbox>
            </rich-checkbox-group>
          </el-form-item>
        </div>
        <div class="col-md-3">
          <el-form-item label="Checkbox选择" prop="acheck">
            <rich-checkbox
              v-model="ruleForm.acheck"
              true-label="你选择了我"
              false-label="啥都没有">选择框U</rich-checkbox>
          </el-form-item>
        </div>
        <div class="col-md-3">
          <el-form-item label="我选择了" prop="bcheck">
            <rich-checkbox
              v-model="ruleForm.bcheck"
              true-label="你选择了我"
              false-label="啥都没有">选择框Y</rich-checkbox>
          </el-form-item>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Radio组切换" prop="radioGVal">
            <rich-radio-group v-model="ruleForm.radioGVal">
              <rich-radio canceled icon="edit" label="43">组选项A</rich-radio>
              <rich-radio canceled label="54" disabled>组选项B</rich-radio>
              <rich-radio canceled label="72">组选项C</rich-radio>
              <rich-radio canceled label="76">组选项C</rich-radio>
            </rich-radio-group>
          </el-form-item>
        </div>
        <div class="col-md-3">
          <el-form-item label="地址选择" prop="address">
              <address-box
                v-model="ruleForm.address"
                params="123"
                @address-change="addressChanged">
              </address-box>
          </el-form-item>
        </div>
        <div class="col-md-3">
          <el-form-item label="Radio备选项" prop="radiox">
            <rich-radio v-model="ruleForm.radiox" canceled label="12">备选项1</rich-radio>
            <rich-radio v-model="ruleForm.radiox" label="32">备选项2</rich-radio>
            <rich-radio v-model="ruleForm.radiox" label="35" disabled>备选项3</rich-radio>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
        </div>
      </div>

    </el-form>

    <div class="btn-block right">
      <rich-button :plain="true" type="info" shape="capsule" icon="check" @click="submitForm('ruleForm')">立即创建</rich-button>
      <rich-button shape="capsule" icon="swap" @click="resetForm('ruleForm')">重置</rich-button>
    </div>

    <div class="tbl-content">
      <el-button @click="chgColShow">change col show</el-button>
      <input v-for="(v, k) in tableData" v-model="v.disabled" :key="k">
      <form-table
        :rules="tableRules"
        :data="tableData"
        :new-row="newRow"
        :start-tabindex="30"
        disable-field="disabled"
        @row-click="RowClick"
        @switch-change="switchChange"
        @address-change="tableAddressChange"
        @table-change="tableFormChange"
        borderstyle="width: 100%">
        <form-table-column type="expand">
          <template slot-scope="props">
            {{ "名称" + props.row.name }}
            {{ "日期" + props.row.date }}
            {{ "区域" + props.row.address }}
          </template>
        </form-table-column>
        <form-table-column type="selection" width="50" label="选择"></form-table-column>
        <form-table-column col-index="1" type="date" prop="date" label="日期"></form-table-column>
        <form-table-column col-index="2" type="input" prop="name" label="姓名" width="120"></form-table-column>
        <form-table-column col-index="3" type="input" prop="numb" label="数字" :input-option="inputOption"></form-table-column>
        <form-table-column col-index="4" type="fnumber" prop="numtest" label="格式化数字" width="120"></form-table-column>
        <form-table-column col-index="5" v-if="colshow" type="rate" prop="rate" label="比率" width="150"></form-table-column>
        <form-table-column
          type="select"
          col-index="6"
          :options-data="options"
          :select-option="{filterable:true}"
          prop="choose"
          label="下拉选择">
        </form-table-column>
        <form-table-column
          type="labelBtn"
          col-index="7"
          :formatter="labelBtnformatter"
          :label-option="labelBtnOption"
          :label-btn-clicked="labelBtnClicked"
          prop="name"
          label="图标输入">
        </form-table-column>
        <form-table-column
          type="switch"
          prop="switch"
          :switch-option="{onValue:1, offValue:0}"
          label="切换">
        </form-table-column>
        <form-table-column label="地址合并">
          <form-table-column prop="addressDetail" label="详细地址" show-overflow-tooltip></form-table-column>
          <form-table-column type="checkbox" prop="schecked" label="可选"></form-table-column>
        </form-table-column>
        <form-table-column col-index="12" type="operate" width="110"
          :delete-visiable="deletBtn"
          :edit-row="editRow"
          :delete-row="deleteRow"
          :add-row-pre="addRowPre"
          :add-new-row="addNewRow"></form-table-column>
      </form-table>

      <div class="btn-block right">
        <el-pagination
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="itemCount">
        </el-pagination>
      </div>
    </div>
    
  </div>