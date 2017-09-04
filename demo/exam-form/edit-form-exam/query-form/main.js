/** QueryForm component */
define([
  'vue',
  'text!demo/exam-form/edit-form-exam/query-form/main.tpl',
  'funcs'
], function(Vue, tpl, funcs) {
  'use strict';

  var TypeOf = funcs.TypeOf, 
    ObjectPlainIsEqual = funcs.ObjectPlainIsEqual,
    ToPlainObject = funcs.ToPlainObject; //引入类型判断

return Vue.component('QueryForm', {
    template: tpl,
    data: function(){
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
      '$store.state.editForm.tableData': function(val){  // 监控更新最新数据
        this.tableData = val
      }
    },
    mounted: function(){
      this.tableData = this.$store.state.editForm.tableData
    }, 
    methods: {
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
      
      editRow: function(row){  
        this.$store.state.editForm.currentRow = row
        this.$router.push('/edit-row')
      },
      deleteRow: function(row){ 
        
        var x = ToPlainObject(row)     // 删除数据中必需转换为纯对象类型，再保存到新的对象
        if(TypeOf(x) === 'Array'){
          for(var i=0; i<x.length; i++){
            this.removeRows.push(x[i])     //已经删除的行
          }
        }
        
        console.log('Delete Row: ', x)
      },

      addNewRow: function(){ // 转入到新增行数据界面
        this.$router.push('/add-row')
      },

      hiddenBtn: function(data, row, rowIndex){  // 隐藏功能区按钮
        return false
      },
      hiddenTopBtn: function(data, row, rowIndex){  // 隐藏功能区头部按钮
        if(row){
          return true
        } 
        return false
      }
    }
  });
});