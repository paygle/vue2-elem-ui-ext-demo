(function(){
// 应用内基础配置
window.APP_CONFIG = {
	API_URL: "http://192.168.18.76:8080/demo-web/",
	APP_PATH: "/"        // 配置自己的域名
};
 
// 初始化框架组件配置
window.COMPONENTS_CONFIG = {
	// 颜色主题类型 [green,  violet], 默认为空或注释掉本行，用于组件内部控制
	COLOR_THEME:"",
	// 地址默认JSON数据文件地址
	ADDRESS_DATA_URL: "/data/address-data.json",
	// 默认主菜单数据
	MAIN_MENUS: [    
		{ "label" : "Home页面",
			"url" : "home.html",    
			"icon" : "",
			"subMenu" : [
				{
					"label" : "字体图标",
					"url": "../public/index.html",
					"icon" : "el-icon-camera",  
					"subMenu" : []
				}
			]
		},
    {
      "label" : "表单实例",
      "url" : "exam-form.html",
      "icon" : "",
      "subMenu" : [{
        "label" : "El-Form 表单",
        'url': "exam-form.html/el-form",
        "icon" : "",
        "subMenu" : []
      },{
        "label" : "Form-Table 表单",
        'url': "exam-form.html/form-table",
        "icon" : "",
        "subMenu" : []
      },{
        "label" : "Water-Fall 瀑布流",
        'url': "exam-form.html/water-fall",
        "icon" : "",
        "subMenu" : []
      },{
        "label" : "案件跟踪case-track",
        'url': "exam-form.html/case-tracking",
        "icon" : "",
        "subMenu" : []
      },{
        "label" : "表单查-增-改-删实例",
        'url': "exam-form.html/edit-form-exam",
        "icon" : "",
        "subMenu" : [ {
          "label" : "表单查询",
          'url': "exam-form.html/query-form",
          "icon" : "el-icon-search",
          "subMenu" : []
        }, {
          "label" : "表单新增",
          'url': "exam-form.html/add-row",
          "icon" : "el-icon-plus",
          "subMenu" : []
        }, {
          "label" : "表单编辑",
          'url': "exam-form.html/edit-row",
          "icon" : "el-icon-edit",
          "subMenu" : []
        }]
      }]
    }
	]
};
// 常用变量声明
var COMPONENTS = window.APP_CONFIG.APP_PATH + "js/components",
		JSPATH = window.APP_CONFIG.APP_PATH + "js",
		DEMO_EXAM  = window.APP_CONFIG.APP_PATH + "demo"; 

// 第三方库配置
require.config({
	shim: {
		'ELEMENT':{
			deps: ['jquery', 'vue', 'snap'],
			exports: 'ELEMENT'
		},
		'jquery.ztree':{ deps: ['jquery'] },
		'bootstrap':{ deps: ['jquery'] },
	},
	paths : {
		// 路径配置
		"js": JSPATH,
		"utils": JSPATH + "/utils",
		"mixins": JSPATH + "/mixins",
		"libs": JSPATH + "/libs",
		"components": COMPONENTS,
		"demo": DEMO_EXAM,          
		// 常用库配置
		"text" : JSPATH + "/libs/require-text",
		"jquery" : JSPATH + "/libs/jquery",
		"jquery.ztree" : JSPATH + "/libs/jquery.ztree.all",
		"bootstrap" : JSPATH + "/libs/bootstrap",
		"echarts" : JSPATH + "/libs/echarts",
		"easypiechart" : JSPATH + "/libs/easypiechart",
		"md5" : JSPATH + "/libs/md5",
		"websocket" : JSPATH + "/libs/re-websocket",
		"snap" : JSPATH + "/libs/snap",
		"tether" : JSPATH + "/libs/tether",
		"vue" : JSPATH + "/libs/vue",
		"vuex" : JSPATH + "/libs/vuex",
		"vueRouter" : JSPATH + "/libs/vue-router",
		"ELEMENT" : JSPATH + "/elem-ui-ext",
		"dictStore" : JSPATH + "/utils/dictStore",
		"util" : JSPATH + "/utils/util",
		"funcs" : JSPATH + "/utils/funcs",
		"utilExt" : JSPATH + "/utils/util-ext",
		"cacheUtil" : JSPATH + "/utils/cache-util",
	}
});

}());
