/** El-Form-Exam */
define([
  'vue',
  'text!demo/exam-form/form-table-exam/index.tpl',
  'funcs'
], function(Vue, tpl, funcs) {
  'use strict';
  var TypeOf = funcs.TypeOf,
  Browser = funcs.Browser, 
  JsonToObject = funcs.JsonToObject, 
  ObjectPlainIsEqual = funcs.ObjectPlainIsEqual,
  ToPlainObject = funcs.ToPlainObject; //引入类型判断
 
return Vue.component('FormTableExam', {
  template: tpl,
  data: function() {
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
      browser: Browser,
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
    tableFormChange: function(row, property, rowIndex, val, data) {
      console.log('Table Changed', row, property, rowIndex, val, data);
    },
    tableAddressChange: function(row, property, rowIndex, val, data){
      console.log('FormTable地址改变：', row, property, rowIndex, val, data);
    },
    addressChanged: function(data){
      console.log('地址改变，返回文字：', data, data.cn, data.param);
    },
    editableFun: function(v){
      if(v.choose==5){
        return false
      }
      return true
    },
    nodeClick: function(index){
      console.log('nodeClick:', index)
    },
    labelBtnformatter: function(row, column){   // 手动翻译
      let v = row[column['property']]
      if( v == 1) {
        return '正确的手动翻译点击标签'
      }
      return '错误的手动翻译'
    },
    labelBtnClicked: function(row, property, store){  // 点击标签边上的按钮回调
      row[property] = 2
      console.log('labelBtnClicked', row[property], row, property, store)
    },
    currentStep: function(step){              // 当前步骤回调
      console.log('Step:', step)
    },
    submitForm: function(formName) {
      this.$refs[formName].validate(function(valid){
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm: function(formName) {
      this.$refs[formName].resetFields();
    },
    deletBtn: function(data, row, rowIndex){
      if(row){
        return true
      }
      window.validatorForm = this.$refs.validaForm
      return true
    },
    editRow: function(row){
      console.log('Edit Row: ', row)
      this.currentRow = row
      this.editRows.push(row)   //编辑过的行属于原列表引用，不要转换为新对象，如果转换则得不到最新修改的值
      this.popEdit = true
    },
    deleteRow: function(row){
      let x = JsonToObject(row) // 删除数据中必需转换为纯对象类型，再保存到新的对象
      if(TypeOf(x) === 'Array'){
        for(let i=0; i<x.length; i++){
          this.removeRows.push(x[i])     //已经删除的行
        }
      }

      console.log('Delete Row: ', x)
    },

    addRowPre: function(currbtn){ // 增加一行数据之前处理 参数为当前编辑组件用于提交通知
      this.currentAddBtn = currbtn
      this.currentRow = this.newRow
      console.log('add Row Pre')
      if (this.currentAddBtn){
        this.currentAddBtn.$emit('addrow')
        console.log('submit New  Row')
      } 
    },
    setColOption: function(row, column, $index){ // 动态选项
      console.log("setColOption:",  row, column, $index)
      return {}
    },
    addNewRow: function(){ //返回新增行数据
      console.log('add Row')
      this.newAddRows.push(ToPlainObject(this.currentRow))    //添加的新行必需转换为纯数据对象，再保存
      return this.currentRow;
    }
  },

  // destroyed(){
  //   // this.$children = null;
  //   // $(this.$el).remove();
  // },
  
  mounted: function(){
    console.log("重新加载中...");
  }
});

});
