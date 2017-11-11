/** El-Form-Exam */
define([
  'vue',
  'text!demo/color-form/form-exam/main.tpl',
  'funcs',
  'mixins/emitter',
  'mixins/filters'
], function(Vue, tpl, funcs, emitter, filters) {
  'use strict';
  var focusInput = funcs.focusInput; //引入获取焦点函数

  console.log('ElForm:', emitter, filters, focusInput)

return Vue.component('FormExam', {
  template: tpl,
  mixins: [emitter, filters],
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
      compareStyl: [               // 比较字段样式规则
        {
          style: {                 // 自定义样式
            color: '#fff',
            background: 'yellow'
          },
          fields: ['name', 'desc'],      // 需要比较触发计算的字段
          stylefields: ['name','desc'],  // 需要设置样式的字段（省略时，同fields)
          compare:function(data) {
            return data.name === data.desc;    // 返回为真时设置给定样式
          }
        },
        {
          style: {                 // 自定义样式
            color: '#fff',
            background: 'green'
          },
          fields: ['name','region', 'delivery'],      // 需要比较触发计算的字段
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
            if (data.checklist.length > 1) return true;
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
      restaurants: [],   // 查询数据列表
      switchAttrs:{
        onValue: 1,
        offValue: 0,
        onText:"是",
        offText:"否"
      },
      ruleForm: {
        name: '',
        region: 'beijing',
        date1: '2017-11-06',
        date2: '',
        delivery: true,
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
      itemForm: {
        name: '',
        region: 'beijing',
        date1: '2017-11-06',
        date2: '',
        delivery: true,
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
        desc: ''
      },
      sideGuideStore: null,
      sideGuideData:{
        //  width: '110px',           // 菜单宽度
        //  align: 'let',            // 文字对齐   left | center | right
        //  displaySide: 'left',     // 菜单显示位置  left | right
         setGuider: this.setGuider,
         sideStore: this.siderStore,
         data: [{
           anchor: 'human',
           text: '人',
           icon: 'el-icon-somebody',
           list: [
            {
              anchor: 'human',
              text: '李四',
              icon: 'el-icon-somebody'
            }
           ],
           operations:[
            {
              action: this.actionSiderMan,
              text: '焦点获取',
              icon: 'el-icon-circle-plus'
            }
           ]
         }
       ]}
    };
  },
  methods: {
    setGuider: function(store){
      this.sideGuideStore = store
    },
    // 侧菜初始化数据对象
    siderStore: function(store){
      console.log('siderStore:', store)
    },
   // 焦点
   actionSiderMan: function(store){
    focusInput(this.$refs.focusItem);
   },
   // list-complete 加载数据
   loadAll: function() {
      return [
        { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
        { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
        { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
        { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
        { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
        { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
        { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
        { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
        { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
        { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
        { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
        { "value": "枪会山", "address": "上海市普陀区棕榈路" },
        { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
        { "value": "钱记", "address": "上海市长宁区天山西路" },
        { "value": "壹杯加", "address": "上海市长宁区通协路" }
      ];
    },
    // list-complete 触发点击行事件
    listRowClickA: function(row){
      this.$refs.listCompleteA.$emit('item-click', row)
    },
    // list-complete 触发点击行事件
    listRowClickB: function(row){
      this.$refs.listCompleteB.$emit('item-click', row)
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
      this.$nextTick(function() { focusInput(this.$refs.refItem); });
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
    }
  },
  created: function() {
    //必须在此执行以下语句，valid-item 才能初始着色状态
    this.$nextTick(function(){ this.broadcast('ValidItem', 'load.valid.fields', [this, 'ValidItem']); });
  },
  mounted: function(){
    this.restaurants = this.loadAll();
  }
});

});