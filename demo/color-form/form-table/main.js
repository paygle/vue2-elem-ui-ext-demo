/** El-Form-Exam */
define([
  'vue',
  'text!demo/color-form/form-table/main.tpl',
  'funcs'
], function(Vue, tpl, funcs) {
  'use strict';
  var focusInput = funcs.focusInput; //引入获取焦点函数
  var ToPlainObject = funcs.ToPlainObject;
  var JsonToObject = funcs.JsonToObject;

return Vue.component('FormTableExam', {
  template: tpl,
  data: function() {
    // 数值验证
    var vadlidateAddr = function(rule, value, callback, source, options) {
      if (value !== '11-1101-110101') {
        callback(new Error('这不是我要选择的值，哼！'));
      }
      callback();
    }
    var vadlidatePernum  = function(rule, value, callback, source, options) {
      console.log("vadlidatePernum: ", value)
      if (value > 1) {
        callback(new Error('您已经超出范围了，哼！'));
      }
      callback();
    }
    var vadlidateFnum = function(rule, value, callback, source, options) {
      console.log("vadlidateFnum: ", value);
      if (value > 11111) {
        callback(new Error('您已经超出范围了，哼！'));
      }
      callback();
    }
    var vadlidateSuggest = function(rule, value, callback, source, options) {
      console.log("vadlidateSuggest: ", value);
      if (value === '上海市嘉定区新郁路817号') {
        callback(new Error('您选择错误了，哼！'));
      }
      callback();
    }

    return { 
       errStyl:{                    // 校验错误样式定义
        color: '#fff',
        background: 'red'
      },
      tableData: [{
        name: 'aaa',
        region: 'beijing',
        date1: '2017-11-06',
        date2: '',
        delivery: '1',
        address: '11-1101-110101',
        adel: 1,
        acheck: '啥都没有',
        checklist: ['你选了我', '啥没有'],
        radioGVal: '76',
        tips: '',
        actbind: '',
        pernum: 0.11,
        fnumber: 11,
        suggest: '嘉定区曹安公路2383弄55号',
        num: 10,
        type: ['线下主题活动', '单纯品牌曝光'],
        resource: '',
        desc: 'deda'
      }],
      compareStyl: [               // 比较字段样式规则
        {
          style: {                 // 自定义样式
            color: '#fff',
            background: 'orange'
          },
          fields: ['name', 'desc'],      // 需要比较触发计算的字段
          stylefields: ['name','desc'],  // 需要设置样式的字段（省略时，同fields)
          compare:function(data) {
            return data.name === 'aaa';    // 返回为真时设置给定样式
          }
        },
        {
          style: {                 // 自定义样式
            color: '#fff',
            background: 'green'
          },
          fields: ['region', 'delivery'],      // 需要比较触发计算的字段
          compare:function(data) {
            if (data.delivery &&  data.region == 'beijing') return true;
            return false;    // 返回为真时设置给定样式
          }
        },
        {
          style: {                 // 自定义样式
            color: '#fff',
            background: 'green'
          },
          fields: ['date1', 'type'],      // 需要比较触发计算的字段
          compare:function(data) {
            if (data.date1 &&  data.type.length > 1) return true;
            return false;    // 返回为真时设置给定样式
          }
        },
        {
          style: {                 // 自定义样式
            color: '#fff',
            background: '#c4c40a'
          },
          fields: ['date2', 'resource'],      // 需要比较触发计算的字段
          compare:function(data) {
            if (data.date2 &&  data.resource == '线下场地免费') return true;
            return false;    // 返回为真时设置给定样式
          }
        },
        {
          style: {                 // 自定义样式
            color: '#fff',
            background: '#c4c40a'
          },
          fields: ['address'],      // 需要比较触发计算的字段
          compare:function(data) {
            if (data.address === '11-1101-110101') return true;
            return false;    // 返回为真时设置给定样式
          }
        },
        {
          style: {                 // 自定义样式
            color: '#fff',
            background: '#c4c40a'
          },
          fields: ['num'],      // 需要比较触发计算的字段
          compare:function(data) {
            if (data.num > 10) return true;
            return false;    // 返回为真时设置给定样式
          }
        },
        {
          style: {                 // 自定义样式
            color: '#fff',
            background: '#c4c40a'
          },
          fields: ['pernum'],      // 需要比较触发计算的字段
          compare:function(data) {
            if (data.pernum > 0.5) return true;
            return false;    // 返回为真时设置给定样式
          }
        },
        {
          style: {                 // 自定义样式
            color: '#fff',
            background: '#c4c40a'
          },
          fields: ['fnumber'],      // 需要比较触发计算的字段
          compare:function(data) {
            if (data.fnumber == 123) return true;
            return false;    // 返回为真时设置给定样式
          }
        },
        {
          style: {                 // 自定义样式
            color: '#fff',
            background: '#c4c40a'
          },
          fields: ['suggest'],      // 需要比较触发计算的字段
          compare:function(data) {
            if (data.suggest == '嘉定区曹安公路2383弄55号') return true;
            return false;    // 返回为真时设置给定样式
          }
        },
        {
          style: {                 // 自定义样式
            color: '#fff',
            background: 'green'
          },
          fields: ['actbind','checklist'],      // 需要比较触发计算的字段
          compare:function(data) {
            if (data.checklist && data.checklist.length) return true;
            return false;    // 返回为真时设置给定样式
          }
        },
        {
          style: {                 // 自定义样式
            color: '#fff',
            background: 'green'
          },
          fields: ['radioGVal', 'tips'],      // 需要比较触发计算的字段
          compare:function(data) {
            if (data.radioGVal == 76) return true;
            return false;    // 返回为真时设置给定样式
          }
        },
        {
          style: {                 // 自定义样式
            color: '#fff',
            background: 'yellow'
          },
          fields: ['num', 'acheck'],      // 需要比较触发计算的字段
          compare:function(data) {
            if (data.acheck == '你选择了我') return true;
            return false;    // 返回为真时设置给定样式
          }
        },
        {
          style: {                 // 自定义样式
            color: '#fff',
            background: 'yellow'
          },
          fields: ['fnumber', 'adel'],      // 需要比较触发计算的字段
          compare:function(data) {
            if (data.adel == 1) return true;
            return false;    // 返回为真时设置给定样式
          }
        }
      ],
      options: [
        {
          value: 'shanghai',
          label: '上海市普陀区'
        },{
          value: 'beijing',
          label: '北京烤普陀区'
        }
      ],
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
        ],
        address: [
          { required: true, validator: vadlidateAddr, trigger: 'change' }
        ],
        pernum: [
          { required: true, validator: vadlidatePernum, trigger: 'blur' }
        ],
        fnumber: [
          { required: true, validator: vadlidateFnum, trigger: 'blur' }
        ],
        suggest: [
          { required: true, validator: vadlidateSuggest, trigger: 'blur' }
        ]
      },
      inputOption:{
        histype:"number",
        // max: 100,
        // min: -100,
        precision: 0
      },
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
      currentAddBtn:null
    };
  },
  created: function() {
    let tempData = [];
    // 填充数据
    for (let i = 0; i < 10; i++) {
      tempData.push({
        disabled: '0',
        name: 'aaa',
        region: 'beijing',
        date1: '2017-11-06',
        date2: '',
        delivery: '1',
        address: '11-1101-110101',
        adel: 1,
        acheck: '啥都没有',
        checklist: ['你选了我', '啥没有'],
        radioGVal: '76',
        tips: '',
        actbind: '',
        pernum: 0.11,
        fnumber: 11,
        suggest: '嘉定区曹安公路2383弄55号',
        num: 10,
        type: ['线下主题活动', '单纯品牌曝光'],
        resource: '',
        desc: 'deda'
      })
    };
    this.tableData = tempData;
    this.$nextTick(function() {
      this.$refs.relTable.lockData();  // 锁定初始值
    });
  },
  methods: {
    validTrigger: function(row, col) {
      console.log('validTrigger:', row, col);
      this.$refs.relTable.modifiedCompare();
    },
    // 修改后样式设置
    modifiedStyl: function(modified, row, prop, rowindex, delnum) {
      console.log('modifiedStyl:', modified, row, prop, rowindex, delnum)
      if (modified) {
        return {todo: 'set', row: {background: 'green' },  col: {background: 'red' }};
      }
      return {todo: 'clear', row: {background: '' },  col: {background: '' }};
    },

    DeleteRow: function(index, row){
      this.tableData.splice(index, 1);
      // this.$refs.relTable.compareClear(index); //清除行
    },

    createStateFilter: function(queryString) {
      return function(state) {
        return (state.address.indexOf(queryString.toLowerCase()) === 0);
      };
    },

    //  list-complete 查询方法
    querySearchAsync: function(queryString, callback) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function() {
        callback(results);
      }, 100 * Math.random());
    },
    // list-complete 选择事件
    handleSelect: function(item) {
      console.log(item);
    },

    addressChanged: function(data){
      console.log('地址改变，返回文字：', data, data.cn, data.param);
    },
    getFillStylDat: function(val) { // 单个组件独立样式着色控制
      if (val == '2018-01-01') {
        return {color: '#fff', background: '#13c63b'};
      } else {
        return {};
      }
    },
    getFillStylSel: function(val) { // 单个组件独立样式着色控制
      if (val == 'shanghai') {
        return {color: '#fff', background: '#13c63b'};
      } else {
        return {};
      }
    },
    getFillStyl: function(val) { // 单个组件独立样式着色控制
      if (val == 5555) {
        return {color: '#fff', background: 'blue'};
      } else  {
        return {};
      }
    },
    getFillStylAddr: function(val) { // 单个组件独立样式着色
      if (val === '12-1201-120101') {
        return {color: '#fff', background: 'rgb(32, 214, 246)'};
      } else  {
        return {};
      }
    },
    getFillStylNum: function(val) {
      if (val == 10) {
        return {color: '#fff', background: 'rgb(32, 214, 246)'};
      } else  {
        return {};
      }
    },
    getFillStylRate: function(val) {
      if (val == 0.11) {
        return {color: '#fff', background: 'rgb(32, 214, 246)'};
      } else  {
        return {};
      }
    },
    getFillStylFNum: function(val) {
      if (val == 11) {
        return {color: '#fff', background: 'rgb(32, 214, 246)'};
      } else  {
        return {};
      }
    },
    getFillStylSuggest: function(val) {
      if (val == '上海市长宁区通协路') {
        return {color: '#fff', background: 'rgb(32, 214, 246)'};
      } else  {
        return {};
      }
    },
    submitForm: function(formName) {
      this.$refs[formName].validate(function(valid) {
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
    submitValidItems: function(e){
      this.broadcast('ValidItem', 'valid.item.change')
    },
    resetValidItems: function(e){
      this.broadcast('ValidItem', 'valid.item.reset')
    },
    anyChange: function(val){
      console.log('anyChange:', val)
    },
    validateTest: function(valid){
      console.log('validateTest', valid.state, valid.msg, valid.prop)
    },
    tableFormChange: function(row, property, rowIndex, val, data) {
      console.log('Table Changed', row, property, rowIndex, val, data);
    },
    switchChange: function(row, property, rowIndex, val, data) {
      console.log('Switch Changed', row, property, rowIndex, val, data);
    },
    tableAddressChange: function(row, property, rowIndex, val, data){
      console.log('FormTable地址改变：', row, property, rowIndex, val, data);
    },
    editableFun: function(v){
      if(v.choose==5){
        return false
      }
      return true
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
  }
});

});