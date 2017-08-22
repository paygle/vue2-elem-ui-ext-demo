<template>  
  <div class="query-form">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">

      <div class="row">
        <div class="col-md-3">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </div>
        <div class="col-md-3">
          <el-form-item label="活动区域" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="这是一段很长很长很长的描述性文字" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="col-md-3">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </div>
        <div class="col-md-3">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <div class="btn-block center">
      <rich-button :plain="true" type="info" shape="capsule" icon="search" @click="submitForm('ruleForm')">查询</rich-button>
      <rich-button shape="capsule" icon="rect-arrow" @click="resetForm('ruleForm')">重置</rich-button>
    </div>
    <div class="btn-block left">
      <el-button :plain="true" type="info" shape="capsule" icon="plus" @click="addNewRow">新建</el-button>
    </div>
    <div class="tbl-content">

      <form-table
        :data="tableData" 
        :new-row="newRow"
        borderstyle="width: 100%">
        <form-table-column prop="date" label="日期"></form-table-column>
        <form-table-column prop="name" label="姓名" width="120" :input-option="inputOption"></form-table-column>
        <form-table-column type="select" :options-data="options" prop="choose" label="下拉选择" translated="select"></form-table-column>
        <form-table-column type="address" prop="address" label="省市区" translated="address"></form-table-column>
        <form-table-column prop="addressDetail" label="详细地址" show-overflow-tooltip></form-table-column>
        <form-table-column type="checkbox" prop="schecked" label="可选"></form-table-column>
        <form-table-column type="operate" width="110" 
          :add-visiable="hiddenBtn"
          :save-visiable="hiddenBtn"
          :edit-visiable="hiddenTopBtn" 
          :delete-visiable="hiddenTopBtn"
          :edit-row="editRow"
          :delete-row="deleteRow"></form-table-column>
      </form-table>

      <div class="btn-block right">
        <el-pagination
          :current-page="currentPage"
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
import FormTable from 'components/form-table'
import FormTableColumn from 'components/form-table-column'
import ElPagination from 'components/pagination'
import { TypeOf, ToPlainObject, ObjectPlainIsEqual } from 'src/utils/funcs'  //引入类型判断

export default{
  name: 'QueryForm',
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
    FormTable,
    FormTableColumn,
    ElPagination
  },
  data(){
    return{
      switchAttrs:{
        onValue: 1,
        offValue: 0,
        onText:"是",
        offText:"否"
      },
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: 1,
        checklist: [],
        acheck: '',
        bcheck: '',
        radioGVal: '',
        radiox: '',
        desc: ''
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
        }],
      tableData: [],
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
      removeRows:[],      //已经删除的行
      newAddRows:[],      //添加的新行
      editRows:[]         //编辑过的行
    }
  },
  watch:{
    '$store.state.editForm.tableData'(val){  // 监控更新最新数据
      this.tableData = val
    }
  },
  mounted(){
    this.tableData = this.$store.state.editForm.tableData
  }, 
  methods: {
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
    
    editRow(row){  
      this.$store.state.editForm.currentRow = row
      this.$router.push('/edit-row')
    },
    deleteRow(row){ 
      
      let x = ToPlainObject(row)     // 删除数据中必需转换为纯对象类型，再保存到新的对象
      if(TypeOf(x) === 'Array'){
        for(let i=0; i<x.length; i++){
          this.removeRows.push(x[i])     //已经删除的行
        }
      }
      
      console.log('Delete Row: ', x)
    },

    addNewRow(){ // 转入到新增行数据界面
      this.$router.push('/add-row')
    },

    hiddenBtn(data, row, rowIndex){  // 隐藏功能区按钮
      return false
    },
    hiddenTopBtn(data, row, rowIndex){  // 隐藏功能区头部按钮
      if(row){
        return true
      } 
      return false
    }
  }
}
</script>