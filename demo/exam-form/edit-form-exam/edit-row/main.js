/** edit-row component */
define([
  'vue',
  'text!demo/exam-form/edit-form-exam/edit-row/main.tpl',
  'funcs'
], function(Vue, tpl, funcs) {
  'use strict';

  var TypeOf = funcs.TypeOf, ToPlainObject = funcs.ToPlainObject; //引入类型判断
 
  return Vue.component('EditRow', {
    template: tpl,
    data: function(){
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
  
    methods: {
      submit: function(){
        let tableData = this.$store.state.editForm.tableData
        let currentRow = this.$store.state.editForm.currentRow
        let index = tableData.indexOf(currentRow)
        tableData.splice(index, 1, ToPlainObject(this.ruleForm))
        this.$router.push('/query-form')
      },
      resetForm: function(){
        this.$refs['ruleForm'].resetFields();  // 初始化清空
      }
    },
    mounted: function(){
      this.ruleForm = this.$store.state.editForm.currentRow  // 初始化需要修改的内容
    }
  });

});
