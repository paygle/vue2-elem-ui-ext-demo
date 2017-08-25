<div class="edit-row">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">

    <div class="row">
      <div class="col-md-3">
        <el-form-item label="日期" prop="date">
          <el-date-picker 
            v-model="ruleForm.date" 
            type="date" 
            data-type="string"
            placeholder="选择日期" 
            style="width: 100%;"></el-date-picker>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="切换" prop="switch">
          <custom-switch 
            v-model="ruleForm.switch" 
            :on-value="switchAttrs.onValue" 
            :off-value="switchAttrs.offValue" 
            :on-text="switchAttrs.onText" 
            :off-text="switchAttrs.offText"> 
          </custom-switch>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="数值" prop="numtest">
          <el-input v-model="ruleForm.numtest"></el-input>
        </el-form-item>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-3">
        <el-form-item label="区域" prop="address">
          <address-box v-model="ruleForm.address"></address-box>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="详细地址" prop="addressDetail">
          <el-input v-model="ruleForm.addressDetail"></el-input>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="选择" prop="choose">
          <el-select v-model="ruleForm.choose" placeholder="请选择活动区域">
            <el-option 
              v-for="(item, index) in options" 
              :key="index" 
              :label="item.label" 
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="col-md-3">
        <el-form-item label="我选择了" prop="schecked">
          <rich-checkbox 
            v-model="ruleForm.schecked" 
            true-label="你选择了我" 
            false-label="啥都没有">必选项目</rich-checkbox>
        </el-form-item>
      </div>
    </div>
  </el-form>
  <div class="btn-block center">
    <rich-button :plain="true" type="info" shape="capsule" icon="check" @click="submit">修改</rich-button>
    <rich-button shape="capsule" icon="rect-arrow" @click="resetForm">重置</rich-button>
  </div>
</div>