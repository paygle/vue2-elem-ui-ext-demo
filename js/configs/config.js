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
		{ "label" : "案例效果",
			"url" : "home.html",    
			"icon" : "",
			"subMenu" : [
				{
					"label" : "分类",
					"url": "exam.html",
					"icon" : "el-icon-circle-rmb",  
					"subMenu" : [ 
						{
							"label" : "子首页面",
							'url': "exam.html",
							"icon" : "el-icon-circle-rmb",
							"subMenu" : []
						}
					]
				}
			]
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
		}
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
		"snap" : JSPATH + "/libs/snap",
		"vue" : JSPATH + "/libs/vue",
		"ELEMENT" : JSPATH + "/elem-ui-ext",
		"cfgutil" : JSPATH + "/configs/util",
		"data" : JSPATH + "/configs/data"
	}
});

}());
