<template>  
  <div class="add-row">
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
      <rich-button :plain="true" type="info" shape="capsule" icon="check" @click="submit">立即创建</rich-button>
      <rich-button shape="capsule" icon="rect-arrow" @click="resetForm">重置</rich-button>
    </div>
  </div>
</template>
<script>
import ElForm from 'components/form'
import ElFormItem from 'components/form-item'
import ElInput from 'components/input'
import ElButton from 'components/button'
import ElSelect from 'components/select'
import ElOption from 'components/option'
import CustomSwitch from 'components/custom-switch'
import RichCheckbox from 'components/rich-checkbox'                // 自定义 checkbox
import RichCheckboxGroup from 'components/rich-checkbox-group'
import RichRadio from 'components/rich-radio'                      // 自定义 Radio
import RichRadioButton from 'components/rich-radio-button'
import RichRadioGroup from 'components/rich-radio-group'
import RichButton from 'components/rich-button'
import ElDatePicker from 'components/date-picker'
import AddressBox from 'components/address-box'
import { TypeOf, ToPlainObject } from 'src/utils/funcs'  //引入类型判断

export default{
  name: 'AddRow',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElSelect,
    ElOption,
    CustomSwitch,
    RichCheckbox,
    RichCheckboxGroup,
    RichRadio,
    RichRadioGroup,
    RichRadioButton,
    RichButton,
    ElDatePicker,
    AddressBox
  },
  data(){
    return{
      ruleForm:{
        date: '',
        name: '',
        numtest : 0,
        address: '',
        addressDetail: '',
        schecked: '',
        switch: 0,
        choose: '1'
      },
      switchAttrs:{
        onValue: 1,
        offValue: 0,
        onText:"是",
        offText:"否"
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      options: [{
          value: '1',
          label: '黄金糕'
        }, {
          value: '2',
          label: '双皮奶'
        }, {
          value: '3',
          label: '蚵仔煎'
        }, {
          value: '4',
          label: '龙须面'
        }, {
          value: '5',
          label: '上海市普陀区普陀区北京烤'
        }]

    }
  },
  computed:{
    tableData(){
      return this.$store.state.editForm.tableData
    }
  },
  methods: {
    submit(){
      this.tableData.push(ToPlainObject(this.ruleForm))
      this.$router.push('/query-form')
    },
    resetForm(){
      this.$refs['ruleForm'].resetFields();  // 初始化清空
    }
  },
  mounted(){
    this.$refs['ruleForm'].resetFields();  // 初始化清空
  }
}
</script>