(function(){
// 应用内基础配置
window.APP_CONFIG = {
	DEBUG: true,         // 是否为调试模式
	API_URL: "http://192.168.18.76:8080/demo-web/",
	IMG_URL:'http://dev.gzdev.tk:3980',
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
					"url": "~/public/index.html",
					"icon" : "el-icon-camera",
					"subMenu" : []
				},
				{
					"label" : "拖拽",
					"url": "dragger.html",
					"icon" : "el-icon-move",
					"subMenu" : []
				}
			]
		},{
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
        "label" : "GridLayer 布局流",
        'url': "exam-form.html/grid-layer",
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
		},{
			"label" : "表单着色",
			"url" : "color-form.html",
			"icon" : "",
			"subMenu" : [
				{
					"label" : "Form 着色",
					"url": "color-form.html/form",
					"icon" : "el-icon-paper-list",
					"subMenu" : []
				},
				{
					"label" : "Table 着色",
					"url": "color-form.html/table",
					"icon" : "el-icon-paper-list",
					"subMenu" : []
				},
				{
					"label" : "Form-Table 着色",
					"url": "color-form.html/form-table",
					"icon" : "el-icon-paper-list",
					"subMenu" : []
				}
			]
		}
	]
};
// 常用变量声明
var COMPONENTS = window.APP_CONFIG.APP_PATH + "js/components",
		JSPATH = window.APP_CONFIG.APP_PATH + "js",
		DEMO_EXAM  = window.APP_CONFIG.APP_PATH + "demo";   // demo 业务主目录配置

// 第三方库配置
require.config({
	// 第三方库依赖关系配置
	shim: {
		'ELEMENT':{
			deps: ['jquery', 'vue'],
			exports: 'ELEMENT'
		},
		'vuex':{ deps: ['promise'] },
		'jquery.ztree':{ deps: ['jquery'] },
		'ztree.exhide':{ deps: ['jquery.ztree'] },
		'bootstrap':{ deps: ['jquery'] },
	},
	paths : {
		// 常用路径别名配置
		"js": JSPATH,
		"utils": JSPATH + "/utils",
		"mixins": JSPATH + "/mixins",
		"libs": JSPATH + "/libs",
		"components": COMPONENTS,
    "webuploader": JSPATH + "/libs/uploader/webuploader",
		"uploader": COMPONENTS + "/img-components", // 上传组件
		"demo": DEMO_EXAM,                                   // demo 业务主目录配置
		// 常用库和工具文件配置
		"promise" : JSPATH + "/libs/es6-promise",
		"text" : JSPATH + "/libs/require-text",
		"jquery" : JSPATH + "/libs/jquery",
		"jquery.ztree" : JSPATH + "/libs/jquery.ztree.all",
		"ztree.exhide" : JSPATH + "/libs/jquery.ztree.exhide",
		"bootstrap" : JSPATH + "/libs/bootstrap",
		"echarts" : JSPATH + "/libs/echarts",
		"easypiechart" : JSPATH + "/libs/easypiechart",
		"md5" : JSPATH + "/libs/md5",
		"websocket" : JSPATH + "/libs/re-websocket",
		"tether" : JSPATH + "/libs/tether",
		"lodash" : JSPATH + "/libs/lodash",
		"vue" : JSPATH + "/libs/vue",
		"vuex" : JSPATH + "/libs/vuex",
		"vueRouter" : JSPATH + "/libs/vue-router",
		"ELEMENT" : JSPATH + "/elem-ui-ext",
		"dictStore" : JSPATH + "/utils/dictStore",
		"util" : JSPATH + "/utils/util",
		"funcs" : JSPATH + "/utils/funcs",
		"utilExt" : JSPATH + "/utils/util-ext",
		"storageCache":  JSPATH + "/utils/web-storage-cache",
		"cacheUtil" : JSPATH + "/utils/cache-util",
		"pako" : JSPATH + "/libs/pako"
	}
});

}());
