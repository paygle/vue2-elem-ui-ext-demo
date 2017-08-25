import ElSteps from 'components/steps'
import ElStep from 'components/step'
import ElForm from 'components/form'
import ElFormItem from 'components/form-item'
import ElInput from 'components/input'
import ElButton from 'components/button'
import ElSelect from 'components/select'
import ElOption from 'components/option'
import ElDatePicker from 'components/date-picker'
import ElTimePicker from 'components/time-picker'
import ElSwitch from 'components/switch'
import ElCheckboxGroup from 'components/checkbox-group'
import ElCheckbox from 'components/checkbox'
import ElRadioGroup from 'components/radio-group'
import ElRadio from 'components/radio'
import ElTable from 'components/table'
import ElTableColumn from 'components/table-column'
import ElDialog from 'components/dialog'
import ElPagination from 'components/pagination'
import ValidItem from 'components/valid-item'
import {randomChar, TypeOf, ToPlainObject, ObjectPlainIsEqual } from 'src/utils/funcs';  //引入类型判断
import emitter from 'src/mixins/emitter';
import filters from 'src/mixins/filters'
import ElPopover from 'components/popover'
import RichRadio from 'components/rich-radio'                // 自定义 checkbox
import RichRadioGroup from 'components/rich-radio-group'
import SeasonSelect from 'components/season-select'
import RateNumber from 'components/rate-number'
import Message from 'components/message'
import ElDropdown from 'components/dropdown'
import ElDropdownMenu from 'components/dropdown-menu'
import ElDropdownItem from 'components/dropdown-item'
import ElRow from 'components/row'
import ElCol from 'components/col'

export default {
  name: 'ElFormExam',
  mixins: [emitter, filters],
  components:{
    ElRow,
    ElCol,
    RateNumber,
    ElSteps,
    ElStep,
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElSelect,
    ElOption,
    ElDatePicker,
    ElTimePicker,
    ElSwitch,
    RichRadio,
    RichRadioGroup,
    ElCheckbox,
    ElCheckboxGroup,
    ElRadioGroup,
    ElRadio,
    ElTable,
    ElTableColumn,
    ElDialog,
    ElPagination,
    ValidItem,
    ElPopover,
    SeasonSelect,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem
  },
  props:{

  },
  data () {
    const validDate = ()=>{
 
    }

    return { 
      fieldset:{               // 返回字段名称设置
        kindCode: 'kindCode',
        periodType: 'periodType',
        season: 'season',
        startMonth: 'startMonth',
        endMonth: 'endMonth'
      },
      seasonResult: [          // 初始化数据格式
        {
          kindCode: 'kind_12345',
          periodType: '2',
          season: '1',
          startMonth: '10',
          endMonth: '12'
        },{
          kindCode: 'kind_12345',
          periodType: '2',
          season: '2',
          startMonth: '13',
          endMonth: '15'
        },{
          kindCode: 'kind_12345',
          periodType: '2',
          season: '3',
          startMonth: '16',
          endMonth: '18'
        },{
          kindCode: 'kind_12345',
          periodType: '2',
          season: '4',
          startMonth: '19',
          endMonth: '21'
        }
      ],
      reasonChose: 1,              // 季节切换绑定值
      vaItems:{
        name: '这是一段很长很长很长的描述性文字',
        number1: '',
        number2: '',
      },
      active: 0.134,                  // 已激活步骤
      dialogVisible: false,
      currentRowData: {
        name: '',
        region: '124',
        date1: '',
        date2: '',
        strnumber: '',
        addressDetail: '',
        schecked: '',
        choose: ''
      },
      ruleForm: {
        name: '',
        region: '54657',
        date: '2017-05-01',
        date1: '',
        type: [],
        dateRange: [],
        delivery: false,
        resource: '',
        desc: '',
        xnumber: 1,
        pernum: 0.02
      },
      optionsData: [
        {label: '选错1', value: '124'},
        {label: '选错2', value: '54'},
        {label: '选错3', value: '453'},
      ],
      inputRule:{
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        number1: [
          { required: true, type: 'number', max: 100, message: '请输入数字', trigger: 'blur' }
        ],
        number2: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        date: [
            { required: true, type:'date', message: '请选择初登日期', trigger: 'change'}
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        xnumber: [
          { required: true, type: 'number', message: '必须是数字', trigger: 'blur' }
        ],
        pernum: [
          { required: true, type: 'number', min: 0, max: 1, message: '必须是数字0-100', trigger: 'blur' }
        ]
      },
      tableData: [
        {
          date1: '2017-05-03',
          name: '霄爱',
          date2: '2017-1-1',
          region: '加湿器肖霄爱不释手汪珠后年的',
          strnumber: '0001234566.23546',
          addressDetail: '上海市普陀区金沙江路 1518 弄',
          schecked: '空空的',
          choose: '1624'
        },
        {
          date1: '2018-05-03',
          name: '霄爱',
          date2: '2017-1-3',
          region: '不为来后 挑逗粗枝大叶为',
          strnumber: '94566.23546',
          addressDetail: '普陀区金沙江路 ',
          schecked: '空空的',
          choose: '54657'
        },
        {
          date1: '2017-05-03',
          name: '霄爱',
          date2: '2017-1-4',
          region: '目的地 皇粮',
          strnumber: '4566.23546',
          addressDetail: '上海市1518',
          schecked: '空空的',
          choose: '54657'
        }
      ]
    }
  },
  watch:{
    seasonResult(n){
      console.log('Season Watch:', n)
    }
  },
  methods: {
    dropCommand(v){
      console.log('dropCommand', v)
    },
    // 季节类型同步
    typeChange(val){
      this.reasonChose = parseInt(val)
      console.log('reasonChose Result:', this.reasonChose)
    },
    // 验证回调
    validateSeason(isValid){
      console.log('validateSeason:', isValid)
    },
    // 发送验证
    submitSeason(){
      this.$refs.seasonRef.validateSelected()
      console.log('Season submit Valid:', this.seasonResult)
    },
    // 重置选择结果
    resetSeason(){
      this.$refs.seasonRef.resetSelected()
    },
    
    filterMethod(v){
      // 改变自己的数据内容
      this.optionsData = [
        {label: '选1', value: '1624'},
        {label: '选2', value: '54657'},
        {label: '选3', value: '45673'},
      ]
    },
    anyChange(val){
      console.log('anyChange:', val)
    },
    validateTest(valid){
      console.log('validateTest', valid.state, valid.msg, valid.prop)
    },
    submitValidItems(e){
      this.broadcast('ValidItem', 'valid.item.change')
    },
    resetValidItems(e){
      this.ruleForm.date = '2018-5-1'
      this.broadcast('ValidItem', 'valid.item.reset')
      Message({ message: '当前步骤回调, 改变自己的数据内容,<br>加湿器肖霄爱不释手汪珠后年的', type:'warning'});
    },
    currentStep(step){              // 当前步骤回调
      console.log('Step:', step)
    },
    next() {
      if (this.active++ > 2) this.active = 0;
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
    addNewRow(){
      this.dialogVisible = true
    },
    addNewFormData(){
      this.tableData.push(ToPlainObject(this.currentRowData))  // 新增一行
      this.$refs.addNewRowForm.resetFields()                   // 重置表单
      this.dialogVisible = false                               // 关闭弹出窗口
    },
    EditRow(scope){
      let { $index, row, store, expand } = scope;
      this.currentRowData = row;
      store.commit('toggleRowExpanded', row);
      
    },
    DeleteRow(index, row){
      this.tableData.splice(index, 1);
    }
  },
  /**
   * 在路由中使用 keep-alive 组件激活时调用 
   * 本函数主要是重新做整个组件数据的初始化
   */
  activated(){
    let that=this, tableData = [
        {
          date1: '2016-05-03',
          name: '王虎',
          date2: '2017-1-1',
          region: '加湿器肖霄爱不释手汪珠后年的',
          strnumber: '0001234566.23546',
          addressDetail: '上海市普陀区金沙江路 1518 弄',
          schecked: '空空的',
          choose: '1624'
        },
        {
          date1: '2017-05-03',
          name: '王虎',
          date2: '2017-1-3',
          region: '不为来后 挑逗粗枝大叶为',
          strnumber: '94566.23546',
          addressDetail: '普陀区金沙江路 ',
          schecked: '空空的',
          choose: '54657'
        },
        {
          date1: '2017-05-03',
          name: '王虎',
          date2: '2017-1-4',
          region: '目的地 皇粮',
          strnumber: '4566.23546',
          addressDetail: '上海市1518',
          schecked: '空空的',
          choose: '54657'
        }
      ];

    setTimeout(function(){
      that.tableData = tableData
      console.log('table activated')
    }, 1000)
  },
  /**
   * 在路由中使用 keep-alive 组件停用时调用
   */ 
  deactivated() {
     this.tableData = []
     console.log('table deactivated')
  },
 
  mounted() {
    // let ta = this
    // setInterval(function(){
    //   ta.validInput1= Math.random()
    // }, 1000)
 
    console.log("重新加载中...");

  }
}