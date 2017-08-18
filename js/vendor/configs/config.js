(function(){
// 应用内基础配置
window.APP_CONFIG = {
	APP_PATH: "/",        // 配置自己的域名
	ENV: "dev",           // 应用环境 dev | product
	ENV_EXT_STR: ""       // 应用环境后缀
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
var ENV_EXT_STR = window.APP_CONFIG.ENV=== 'product' ? '.min': '';
var JS_VENDOR = window.APP_CONFIG.APP_PATH + "js/vendor";
var JS_COMPONENTS = window.APP_CONFIG.APP_PATH + "js/components";
var JS_DEMO_EXAM  = window.APP_CONFIG.APP_PATH + "js/demo/exam"; 
window.APP_CONFIG.ENV_EXT_STR = ENV_EXT_STR;

// 第三方库配置
require.config({
	shim: {
		'ELEMENT': ['vue', 'jquery', 'snap']
	},
	paths : {
		"pageheader" : JS_COMPONENTS + "/pageheader/pageheader",
		"util" : JS_VENDOR + "/configs/util",
		"text" : JS_VENDOR + "/libs/require-text",
		"jquery" : JS_VENDOR + "/libs/jquery"+ENV_EXT_STR,
		"snap" : JS_VENDOR + "/libs/snap"+ENV_EXT_STR,
		"vue" : JS_VENDOR + "/libs/vue"+ENV_EXT_STR,
		"ELEMENT" : JS_VENDOR + "/elem-ui-ext",
		"data" : JS_VENDOR + "/configs/data",
		
		"policy.sales" : JS_DEMO_EXAM + "/sales",
		"policy.insured" : JS_DEMO_EXAM + "/insured",
		"policy.main" : JS_DEMO_EXAM + "/main",
		"policy.veh" : JS_DEMO_EXAM + "/veh",
		"policy.vhlowner" : JS_DEMO_EXAM + "/vhlowner",
		"policy.cvrg" : JS_DEMO_EXAM + "/cvrg"
	}
});

}());
