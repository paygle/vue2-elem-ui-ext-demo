define([
  'vue',
  'text!demo/home/panel/main.tpl',
  'mixins/emitter'
], function(Vue, tpl, emitter) {
  'use strict';

return Vue.component('Panel', {
  template: tpl,
  componentName: 'Panel',
  mixins: [emitter],
  props:{
    find: String,
    args:[Array, Object],     // mesh-tabs 组件传入参数
    tableData:{
      type: Array,
      default:function(){
        return [];
      }
    }
  },
  data(){
    return {
      validInput1: '',
      validInput2: '',
      validInput3: '',
      inputRule:{
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
        ]
      },
      localTableData:[],
      multipleSelection: [],
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
          label: '北京烤鸭北京'
        }]
    }
  },
  methods:{
    validateTest(valid){
      console.log('validateTest', valid.state, valid.msg, valid.prop)
    },
    submitValidItems(e){
      this.broadcast('ValidItem', 'valid.item.change')
    },
    resetValidItems(e){
      this.broadcast('ValidItem', 'valid.item.reset')
    },
    routeParams(route){ // 获取路由参数
      let params = route.params
      this.localTableData = params.tableData ? params.tableData : [];
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  mounted(){ 
    if(this.args) this.localTableData = this.args
  }
});

});
