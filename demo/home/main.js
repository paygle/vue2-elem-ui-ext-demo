/** home 入口模块JS处理 */
define([
  'vue',
	'ELEMENT',
	'demo/home/panel/main'
], function(Vue, ELEMENT, Panel) {
  'use strict';
  Vue.use(ELEMENT); //使用框架组件

  new Vue({
		el: '#main-body',
    name: 'home',
    data: {
				inputPrecision: 1.164618,
				multipleSel:[],
				changeTitle: '效率 Efficiency',
				vehicle: '',
				human: '',
				sideGuideData: null,
				sideGuideStore: null,

				range_time: ['2017-02-12', '2017-02-16'],
				select_date: '',
				activeNames: ['1'],
				checklist:[],
				radiox:'',
				activeName2: 'second',
				routeMsg:[
				{ title:'TabA', name:'pane', disabled:true, params: { userId: 123 }},
				{ title:'TabC', name:'pane3', disabled:false, params: { userId: 123 }},
				{ title:'TabB', name:'pane2', params: { tableData: [{
						date: '2016-05-03',
						name: '王虎',
						address: '11-1101-110101',
						addressDetail: '上海市普陀区金沙江路 1518 弄',
						schecked: '空空的',
						choose: '1'
					}, {
						date: '2016-05-07',
						name: '小虎',
						address: '11-1101-110101',
						addressDetail: '上海市普陀区金沙江路 1518 弄',
						schecked: '空空的',
						choose: '2'
					}]
				}}
			],
			radioVal: 3,
			radiolabel:'',
			load: true,
			bcheck: false,
			bswitch: true,
			value1: '',
			inputOption: {
				placeholder: ' 请你不要输入啊'
			},
			inputOption1: {
				placeholder: ' 请你不要输入啊',
				histype: 'string',
				precision: 3,
				roundoff: true
			},
			checkboxOption: {
				trueLabel: '选到我了',
				falseLabel: "空空的"
			},
			pickerOptions0: {
				disabledDate: function(time) {
					return time.getTime() < Date.now() - 8.64e7;
				}
			},
			mselects: '1',
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
			}],
			tableData: [
				{
					date: '2016-05-03',
					name: '王虎',
					address: '11-1101-110101',
					strnumber: '0001234566.23546',
					addressDetail: '上海市普陀区金沙江路 1518 弄伯',
					schecked: '空空的',
					choose: '1'
				}
			],
			tableData2: [{
				date: '2016-05-03',
				name: '虎王小',
				address: '11-1101-110101',
				strnumber: '0001234566.23546',
				addressDetail: '上海市普陀区金沙江路 1518 弄',
				schecked: '空空的',
				choose: '3'
			}, {
				date: '2016-05-07',
				name: '王小虎',
				address: '11-1101-110101',
				strnumber: '0000001234566.20000',
				addressDetail: '上海市普陀区金沙江路 1518 弄',
				schecked: '空空的',
				choose: '4'
			}],
			tableData3: [{
				date: '2016-05-03',
				name: '小海',
				address: '11-1101-110101',
				addressDetail: '上海市普陀区金沙江路 1518 弄',
				schecked: '空空的',
				choose: '2'
			}, {
				date: '2016-05-07',
				name: '小虎路',
				address: '11-1101-110101',
				addressDetail: '上海市普陀区金沙江路 1518 弄',
				schecked: '空空的',
				choose: '2'
			}],
			tableData4: [{
				date: '2016-05-03',
				name: '王路虎',
				address: '11-1101-110101',
				addressDetail: '上海市普陀区金沙江路 1518 弄',
				schecked: '空空的',
				choose: '1'
			}, {
				date: '2016-05-07',
				name: '王路路',
				address: '11-1101-110101',
				addressDetail: '上海市普陀区金沙江路 1518 弄',
				schecked: '空空的',
				choose: '2'
			}],
			address: '11-1101-110101',
			multipleSelection: [],
			fullscreenLoading: false,
			findText: 'Hei Hei !',
			activeName: 'pan31',
			tabsComponents:{
				Panel: Panel                     // 引入 mesh-tabs 需要使用的组件
			},
			meshTabsData:[             // mesh-tabs 初始化数据
				{
					label:'第1个',
					icon: 'el-icon-circle-plus',
					name: 'pan1',
					component: 'Panel',
					args:[{
						date: '2016-05-03',
						name: '王路虎',
						address: '11-1101-110101',
						addressDetail: '上海市普陀区金沙江路 1518 弄',
						schecked: '空空的',
						choose: '1'
					}]
				},{
					label:'第2个',
					name: 'pan2',
					closable: true,
					component: 'Panel',
					args:[{
						date: '2011-01-01',
						name: '王路虎',
						address: '11-1101-110101',
						addressDetail: '普陀区金沙江路 18 弄',
						schecked: '空空的',
						choose: '1'
					}]
				},{
					label:'第3--个',
					name: 'pan31',
					
					component: 'Panel',
					args:[{
						date: '2016-05-03',
						name: '王路虎',
						address: '11-1101-110101',
						addressDetail: '上海市普陀区金沙江路 1518 弄',
						schecked: '空空的',
						choose: '1'
					}]
					}
			],

			archData:[{
				label: '企业财险',
				value: 'A0',
				iconClass: '',
				children: [
					{
						label: '投保画面',
						value: 'A1',
						iconClass: 'el-icon-note-list',
						children: [
							{
								label: '投保画面叶子',
								value: 'AA1',
								iconClass: 'el-icon-note-list'
							}
						]
					},{
						label: '批改',
						value: 'B1',
						iconClass: 'el-icon-note-list',
						children: [
							{
								label: '批改叶子',
								value: 'BB1',
								iconClass: 'el-icon-note-list',
							},{
								label: '批改',
								value: 'BB2',
								iconClass: 'el-icon-note-list',
							}
						]
					},{
						label: '险别',
						value: 'C1',
						iconClass: 'el-icon-note-list',
						children: [
							{
								label: '险别叶子',
								value: 'CC1',
								iconClass: 'el-icon-note-list'
							}
						]
					},{
						label: '特约',
						value: 'D1',
						iconClass: 'el-icon-note-list',
						children: [
							{
								label: '特约叶子',
								value: 'DD1',
								iconClass: 'el-icon-note-list'
							}
						]
					},{
						label: '条款',
						value: 'E1',
						iconClass: 'el-icon-note-list',
						children: [
							{
								label: '条款叶子',
								value: 'ee1',
								iconClass: 'el-icon-note-list',
							}
						]
					},{
						label: '核保规则',
						value: 'F1',
						iconClass: 'el-icon-note-list',
						children: [
							{
								label: '核保规则叶子',
								value: 'FF1',
								iconClass: 'el-icon-note-list'
							}
						]
					},{
						label: '保费规则',
						value: 'H1',
						iconClass: 'el-icon-note-list',
						children: [
							{
								label: '保费规则叶子',
								value: 'HH1',
								iconClass: 'el-icon-note-list'
							}
						]
					},{
						label: '业务规则',
						value: 'I1',
						iconClass: 'el-icon-note-list',
						children: [
							{
								label: '业务规则叶子',
								value: 'II1',
								iconClass: 'el-icon-note-list'
							}
						]
					},{
						label: '管控规则',
						value: 'J1',
						iconClass: 'el-icon-note-list',
						children: [
							{
								label: '管控叶子',
								value: 'JJ1',
								iconClass: 'el-icon-note-list',
							}
						]
					}
				]
			},{
				label: '检测',
				value: 'A1',
				iconClass: ''}],
			defaultProps: {
				children: 'children',
				label: 'label'
			}
    },
    filters: {
      date2text: function(val) {
        return Date2String(val);
      }
    },
    watch: {
      value1: function(newval) {
        console.log('Date Type: ', typeof newval);
      },
      range_time: function(n) {
        console.log('Range Time', n)
      }
    },
    methods: {
      setGuider: function(store){
        this.sideGuideStore = store
      },
      selectChange: function(){
        console.log('selectChange')
      },
      AddFormData: function(){
        this.tableData.push({
          date: '2016-05-03',
          name: '王虎',
          address: '11-1101-110101',
          strnumber: '0001234566.23546',
          addressDetail: '上海市普陀区金沙江路 1518 弄',
          schecked: '空空的',
          choose: '1'
        })
      },
      // 侧菜初始化数据对象
      siderStore: function(store){
        console.log('siderStore:', store)
      },
      // 侧菜单点击回调函数
      actionSiderVeh: function(store){
         var newVeh = {
                anchor: 'vehicle',
                text: '粤B123545',
                icon: 'el-icon-car-back'
              }
        this.vehicle = 'vehicle'
        store.commit('addCell', 0, newVeh) // 在第一类中增加1个
      },
      // 新增
      actionSiderMan: function(store){
        var newMan = {
                anchor: 'human',
                text: '张三',
                icon: 'el-icon-somebody'
              }
        this.human = 'human'
        store.commit('addCell', 1, newMan);  // 在第二类中增加1个
      },
      // 编辑
      editSiderMan: function(store){
        var newMan = {
                anchor: 'human',
                text: '张三丰',
                icon: 'el-icon-somebody'
              }
        this.human = 'human'
        store.commit('editCell', 1,0, newMan); // 编辑第二类第1个
      },
      // 删除
      deleteSiderMan: function(store){
        store.commit('deleteCell', 1, 0);   // 删除第二类第1个
      },
      titleClick: function(){
        this.changeTitle = '效率 Efficiency 语言表达清晰且表意明确'
      },
      chgAddress: function(e){
        var n = parseInt(Math.random()*4);
        var ch = ['12-1201-120101','35-3501-350101','52-5202-520201','44-4402-440201'];
        this.address= ch[n];
      },
      handleNodeClick: function(node) {
        console.log('Architecture点击：', node);
      },
      addNewTabs: function(){
        this.meshTabsData.push(
           {
            label:'第3个',
            name: 'pan3',
            closable: true,
            component: 'Panel',
            args:[{
              date: '2016-05-03',
              name: '王路虎',
              address: '11-1101-110101',
              addressDetail: '上海市普陀区金沙江路 1518 弄',
              schecked: '空空的',
              choose: '1'
            }]
           },{
            label:'第4个',
            name: 'pan4',
            closable: true,
            component: 'Panel',
            args:[{
              date: '2016-07-07',
              name: '王路虎',
              address: '11-1101-110101',
              addressDetail: '上海市普陀区金沙江路 1518 弄',
              schecked: '空空的',
              choose: '1'
            }]
           },{
            label:'第5个',
            name: 'pan5',
            closable: true,
            component: 'Panel',
            args:[{
              date: '2016-09-09',
              name: '王路虎',
              address: '11-1101-110101',
              addressDetail: '上海市普陀区金沙江路 1518 弄',
              schecked: '空空的',
              choose: '1'
            }]
           });

        this.$nextTick(function(){
          this.activeName = 'pan3'
        })
         
      },
      tabClick: function(tab, event){
        console.log('tabClick', tab, event)
      },
      closeCall: function(delTarget, targetName, filterData){// 注意下面两条语句的顺序不能颠倒
        delTarget(targetName);                     // 顺序1. 必须删除对应的tab
        this.meshTabsData = filterData             // 顺序2. tabs 删除功能必须配置这条语句
        console.log('tabRemoveCall', filterData, targetName);
      },
      tabRemove: function(filterData, name){
        this.meshTabsData = filterData              // tabs 删除功能必须配置这条语句
        this.activeName = "pan1"
        console.log('tabRemove', filterData, name)
      },
      btnClick: function(e){
        console.log('Capsule Button click!')
      },
      handleClick22: function(tab, event) {
        console.log(tab, event);
      },
      checkedSelection: function(states, row, column, val) {
        console.log('checkedSelection:', states, row, column, val);
        return true; // 返回true则表明选择本行
      },
      // 在 checkbox 类型中点击头部 checkbox时的回调函数
      checkboxAllToggle: function(tableData, fieldName){
        console.log('checkboxAllToggle:', tableData, fieldName);
      },
      openFullScreen: function() {
				var self = this;
        this.fullscreenLoading = true;
        setTimeout(function(){
          self.fullscreenLoading = false;
        }, 3000);
      },
      handleSelectionChange: function(val) {
        this.multipleSelection = val;
        console.log("selectionChange:", arguments)
      },
      inputEditable: function(row, index) { //设置单元格是否禁用
        var Editable = false;
        if (row['date'] == '2016-05-03') {
          Editable = true;
        }
        return Editable;
      },
      selectEditable: function(row, index) { //设置单元格是否禁用
        var Editable = false;
        if (row['choose'] == '1') {
          Editable = true;
        }
        return Editable;
      },
      handleRemove: function(tab) {
        console.log(tab);
      },
      addressChanged: function(cn){
        console.log('地址改变，返回文字：', cn)
			},
			guiderInit: function() {
				this.sideGuideData = {
					//  width: '110px',           // 菜单宽度
					//  align: 'let',            // 文字对齐   left | center | right
					//  displaySide: 'left',     // 菜单显示位置  left | right
						setGuider: this.setGuider,
						sideStore: this.siderStore,
						data: [{
							anchor: 'vehicle',
							text: '车',
							icon: 'el-icon-car-back',
							hidden: true,  
							list: [
							{
								anchor: 'vehicle',
								text: '粤B123545',
								icon: 'el-icon-car-back',
							}
							],
							operations:[
							{
								action: this.actionSiderVeh,
								text: '新增',
								icon: 'el-icon-circle-plus'
							}
							]
						},{
							anchor: 'wuwuwu',
							text: '物',
							icon: 'el-icon-car-back',
							list: [
							{
								anchor: 'wuwuwu',
								text: '物B123545',
								icon: 'el-icon-car-back',
							}
							]
						},
						{
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
								text: '新增',
								icon: 'el-icon-circle-plus'
							},
							{
								action: this.editSiderMan,
								text: '修改',
								icon: 'el-icon-vwedit'
							},
							{
								action: this.deleteSiderMan,
								text: '删除',
								icon: 'el-icon-circle-cross'
							}
							]
						}
					]};
			}
		},
		created: function(){
			this.guiderInit();
		},
    mounted: function(){
      this.$nextTick(function(){
        window.homeFormTable = this.$refs.homeFormTable
      })
    }

  });
 
});