<template>
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
            <format-number v-model="ruleForm.fnumber"></format-number>
          </el-form-item>
        </div>
        <div class="col-md-3">
          <el-form-item label="比率" prop="rate">
            <rate-number v-model.number="ruleForm.rate"></rate-number>
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
          <el-form-item label="选择了我" prop="checklist">
            <rich-checkbox-group v-model="ruleForm.checklist">
              <rich-checkbox label="你选择了我" disabled></rich-checkbox>
              <rich-checkbox label="啥都没有" icon="hammer"></rich-checkbox>
              <rich-checkbox label="你选了我"></rich-checkbox>
              <rich-checkbox label="啥没有"></rich-checkbox>
            </rich-checkbox-group>
          </el-form-item>
        </div>
        <div class="col-md-3">
          <el-form-item label="我选择了" prop="acheck">
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
          <el-form-item label="组选项切换" prop="radioGVal">
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
          <el-form-item label="备选项" prop="radiox">
            <rich-radio v-model="ruleForm.radiox" label="12">备选项1</rich-radio>
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

      <form-table
        :rules="tableRules"
        :data="tableData"
        :new-row="newRow"
        @address-change="tableAddressChange"
        @table-change="tableFormChange"
        borderstyle="width: 100%">
        <form-table-column type="expand">
          <template scope="props">
            {{ "名称" + props.row.name }}
            {{ "日期" + props.row.date }}
            {{ "区域" + props.row.address }}
          </template>
        </form-table-column>
        <form-table-column type="selection" width="50" label="选择"></form-table-column>
        <form-table-column type="date" prop="date" label="日期"></form-table-column>
        <form-table-column type="input" prop="name" label="姓名" width="120"></form-table-column>
        <form-table-column type="fnumber" prop="numtest" label="格式化数字" width="120"></form-table-column>
        <form-table-column type="rate" prop="rate" label="比率" width="120"></form-table-column>
        <form-table-column 
          :editable="editableFun" 
          type="select" 
          :options-data="options" 
          :select-option="{filterable:true}"
          :set-col-option="setColOption"
          prop="choose" 
          label="下拉选择">
        </form-table-column>
        <form-table-column
          type="labelBtn"
          :formatter="labelBtnformatter"
          :label-option="labelBtnOption"
          :label-btn-clicked="labelBtnClicked"
          prop="choose"
          label="图标输入">
        </form-table-column>
        <form-table-column type="switch" prop="switch" :switch-option="{onValue:1, offValue:0}" label="切换"></form-table-column>
        <form-table-column type="address" prop="address" label="省市区"></form-table-column>
        <form-table-column label="地址合并">
          <form-table-column prop="addressDetail" label="详细地址" show-overflow-tooltip></form-table-column>
          <form-table-column type="checkbox" prop="schecked" label="可选"></form-table-column>
        </form-table-column>
        <form-table-column type="operate" width="110"
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
</template>
<script>
import GuideSteps from 'components/guide-steps'
import GuideStep from 'components/guide-step'
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
import ElTimePicker from 'components/time-picker'
import FormTable from 'components/form-table'
import FormTableColumn from 'components/form-table-column'
import ElPagination from 'components/pagination'
import AddressBox from 'components/address-box'
import RateNumber from 'components/rate-number'
import FormatNumber from 'components/format-number'
import Icollapse from 'components/icollapse'
import IcollapseItem from 'components/icollapse-item'
import { TypeOf, ToPlainObject, JsonToObject, ObjectPlainIsEqual, Browser } from 'src/utils/funcs'  //引入类型判断

export default {
  name: 'FormTableExam',
  components:{
    GuideStep,
    GuideSteps,
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElSelect,
    ElOption,
    RateNumber,
    FormatNumber,
    CustomSwitch,
    RichCheckbox,
    RichCheckboxGroup,
    RichRadio,
    RichRadioGroup,
    RichRadioButton,
    RichButton,
    ElDatePicker,
    ElTimePicker,
    FormTable,
    FormTableColumn,
    ElPagination,
    Icollapse,
    IcollapseItem,
    AddressBox
  },
  props:{

  },
  data () {
    const validInput = function(rule, value, callback){
 
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    // 比率验证
    const vadlidateRate = function(rule, value, callback, source, options){
      console.log("vadlidateRate value: ", value)
    }

    // 数值验证
    const vadlidateNumber = function(rule, value, callback, source, options){
      console.log("vadlidateNumber value: ", value)
    }

    return { 
      browser: new Browser(),
      labelBtnOption: {

      },
      switchAttrs:{
        onValue: 1,
        offValue: 0,
        onText:"是",
        offText:"否"
      },
      ruleForm: {
        name: '',
        rate: 0.2,
        fnumber: 12345678987788,
        region: '',
        date1: '',
        date2: '',
        delivery: 1,
        checklist: [],
        acheck: '',
        bcheck: '',
        radioGVal: '43',
        radiox: '',
        desc: '',
        address: '11-1101'
      },
      tableRules: {
        rate: [{ validator: vadlidateRate, trigger: 'blur' }],
        numtest: [{ validator: vadlidateNumber, trigger: 'blur' }]
      },
      rules: {},
      rules1: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: validInput, trigger: 'blur' }
        ],
        fnumber: [
           { required: true, type:'number', message: '请输入数据格式化', trigger: 'blur' }
        ],
        rate: [
          { required: true, validator: vadlidateRate,  message: '比率有误', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'blur' }
        ],
        date1: [
          { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { required: true, type: 'array',  message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      rules2: {},
      inputOption:{
        histype:"number",
        max: 100,
        min: -100,
        precision: 2
      },
      tableData: [
        {
          date: '2016-05-03',
          name: 'GGG',
          numtest : 18123456,
          address: '11-1101-110101',
          addressDetail: '上海市普陀区请填写活动形式',
          schecked: '空空的',
          rate: 0.5,
          switch: 0,
          choose: '1'
        },
        {
          date: '2016-05-03',
          name: 'HHH',
          numtest : 12345654.78,
          address: '11-1101-110101',
          addressDetail: '上海市请填写活动',
          schecked: '空空的',
          rate: 0.2,
          switch: 0,
          choose: '1'
        }
      ],
      options: [
        {
          value: '1',
          label: '上海市普陀区上海市普陀区'
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
          label: '上海市普陀区普陀区北京烤普陀区北京烤'
        }
      ],
      newRow:{
        date: '',
        name: '',
        numtest : 1,
        address: '',
        addressDetail: '',
        schecked: '',
        switch: 0,
        choose: '1'
      },

      currentPage: 1,
      pageSize: 5,
      itemCount: 30,
      switchOption:{
         onText:'打开',
        offText:'关闭',
        onValue: 1,
        offValue: 0
      },
      inputBtnOption:{
        btnIcon: 'el-icon-menu'      // 按钮图标名称
      },
      currentRow: {},
      currentAddBtn:null,
      removeRows:[],      //已经删除的行
      newAddRows:[],      //添加的新行
      editRows:[]         //编辑过的行
    }
  },
  watch:{
    "ruleForm.radioGVal"(n, o){
      if(n == 43){
        this.rules = this.rules1;
      }else{
        this.rules = this.rules2;
      }
    }
  },
  created(){
    this.rules = this.rules1;
  },
  methods: {
    tableFormChange(row, property, rowIndex, val, data) {
      console.log('Table Changed', row, property, rowIndex, val, data);
    },
    tableAddressChange(row, property, rowIndex, val, data){
      console.log('FormTable地址改变：', row, property, rowIndex, val, data);
    },
    addressChanged(data){
      console.log('地址改变，返回文字：', data, data.cn, data.param);
    },
    editableFun(v){
      if(v.choose==5){
        return false
      }
      return true
    },
    nodeClick(index){
      console.log('nodeClick:', index)
    },
    labelBtnformatter(row, column){   // 手动翻译
      let v = row[column['property']]
      if( v == 1) {
        return '正确的手动翻译点击标签'
      }
      return '错误的手动翻译'
    },
    labelBtnClicked(row, property, store){  // 点击标签边上的按钮回调
      row[property] = 2
      console.log('labelBtnClicked', row[property], row, property, store)
    },
    currentStep(step){              // 当前步骤回调
      console.log('Step:', step)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    deletBtn(data, row, rowIndex){
      if(row){
        return true
      }
      window.validatorForm = this.$refs.validaForm
      return true
    },
    editRow(row){
      console.log('Edit Row: ', row)
      this.currentRow = row
      this.editRows.push(row)   //编辑过的行属于原列表引用，不要转换为新对象，如果转换则得不到最新修改的值
      this.popEdit = true
    },
    deleteRow(row){
      let x = JsonToObject(row) // 删除数据中必需转换为纯对象类型，再保存到新的对象
      if(TypeOf(x) === 'Array'){
        for(let i=0; i<x.length; i++){
          this.removeRows.push(x[i])     //已经删除的行
        }
      }

      console.log('Delete Row: ', x)
    },

    addRowPre(currbtn){ // 增加一行数据之前处理 参数为当前编辑组件用于提交通知
      this.currentAddBtn = currbtn
      this.currentRow = this.newRow
      console.log('add Row Pre')
      if (this.currentAddBtn){
        this.currentAddBtn.$emit('addrow')
        console.log('submit New  Row')
      } 
    },
    setColOption(row, column, $index){ // 动态选项
      console.log("setColOption:",  row, column, $index)
      return {}
    },
    addNewRow(){ //返回新增行数据
      console.log('add Row')
      this.newAddRows.push(ToPlainObject(this.currentRow))    //添加的新行必需转换为纯数据对象，再保存
      return this.currentRow;
    }
  },

  // destroyed(){
  //   // this.$children = null;
  //   // $(this.$el).remove();
  // },
  
  mounted(){
    console.log("重新加载中...");
  }
}
</script>
